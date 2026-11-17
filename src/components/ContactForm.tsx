"use client";

import { useEffect, useId, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export type ContactIntent = "general" | "profile" | "briefing";

interface ContactFormProps {
  defaultIntent?: ContactIntent;
  defaultTopic?: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm({
  defaultIntent = "general",
  defaultTopic,
}: ContactFormProps) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [intent, setIntent] = useState<ContactIntent>(defaultIntent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setIntent(defaultIntent);
    if (defaultIntent === "profile" && !message) {
      setMessage(
        "Please share a copy of Olufunke Hussain's full professional profile."
      );
    } else if (defaultIntent === "briefing" && !message) {
      setMessage(
        defaultTopic
          ? `I would like to request a board or leadership briefing on: ${defaultTopic}.`
          : "I would like to request a corporate governance briefing."
      );
    }
  }, [defaultIntent, defaultTopic, message]);

  const validateField = (
    field: "name" | "email" | "message",
    value: string
  ): string | undefined => {
    const trimmed = value.trim();
    if (field === "name") {
      if (!trimmed) return "Error: Please enter your name.";
      if (trimmed.length < 2)
        return "Error: Name must be at least 2 characters.";
    }
    if (field === "email") {
      if (!trimmed) return "Error: Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return "Error: Enter an email address in the format name@example.com.";
      }
    }
    if (field === "message") {
      if (!trimmed) return "Error: Please enter a brief message.";
      if (trimmed.length < 10)
        return "Error: Message must be at least 10 characters.";
    }
    return undefined;
  };

  const handleBlur = (field: "name" | "email" | "message", value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleInput = (field: "name" | "email" | "message", value: string) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value);

    if (errors[field]) {
      const err = validateField(field, value);
      if (!err) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FieldErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      message: validateField("message", message),
    };

    setTouched({ name: true, email: true, message: true });
    setErrors(nextErrors);

    const firstInvalidKey = (["name", "email", "message"] as const).find(
      (key) => Boolean(nextErrors[key])
    );

    if (firstInvalidKey) {
      const el = formRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(`[name="${firstInvalidKey}"]`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          intent,
          message: message.trim(),
          companyWebsite: honeypot,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(
          data.error ||
            "Your message could not be sent right now. Please try again or reach out via LinkedIn."
        );
        return;
      }

      trackEvent("Contact Form Submit", { intent });
      setStatus("success");
      setStatusMessage(
        intent === "profile"
          ? "Your profile request has been sent. Thank you."
          : intent === "briefing"
            ? "Your briefing request has been sent. Thank you."
            : "Your message has been sent. Thank you."
      );
      setName("");
      setEmail("");
      setMessage("");
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage(
        "A network error occurred. Please check your connection and try again."
      );
    }
  };

  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const nameErrId = `${formId}-name-error`;
  const emailErrId = `${formId}-email-error`;
  const messageErrId = `${formId}-message-error`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-heading`}
      className="space-y-6"
    >
      <h3 id={`${formId}-heading`} className="sr-only">
        Send a message
      </h3>

      {/* Honeypot field hidden from visual users and assistive tech */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company-website`}>Company website</label>
        <input
          id={`${formId}-company-website`}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <fieldset className="space-y-2.5">
        <legend className="text-sm font-medium text-ink">Enquiry type</legend>
        <div className="flex flex-wrap gap-6 pt-1">
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-ink">
            <input
              type="radio"
              name="intent"
              value="general"
              checked={intent === "general"}
              onChange={() => setIntent("general")}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            <span>General enquiry</span>
          </label>
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-ink">
            <input
              type="radio"
              name="intent"
              value="briefing"
              checked={intent === "briefing"}
              onChange={() => {
                setIntent("briefing");
                if (!message.trim()) {
                  setMessage(
                    "I would like to request a corporate governance briefing."
                  );
                }
              }}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            <span>Request a briefing</span>
          </label>
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-ink">
            <input
              type="radio"
              name="intent"
              value="profile"
              checked={intent === "profile"}
              onChange={() => {
                setIntent("profile");
                if (!message.trim()) {
                  setMessage(
                    "Please share a copy of Olufunke Hussain's full professional profile."
                  );
                }
              }}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            <span>Request profile</span>
          </label>
        </div>
      </fieldset>

      <div>
        <label
          htmlFor={nameId}
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          enterKeyHint="next"
          value={name}
          onChange={(e) => handleInput("name", e.target.value)}
          onBlur={(e) => handleBlur("name", e.target.value)}
          aria-invalid={touched.name && errors.name ? "true" : "false"}
          aria-describedby={touched.name && errors.name ? nameErrId : undefined}
          className={`field-input w-full px-3.5 py-2.5 ${
            touched.name && errors.name ? "user-invalid-fallback" : ""
          }`}
        />
        {touched.name && errors.name ? (
          <p id={nameErrId} className="field-error !block">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={emailId}
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="next"
          value={email}
          onChange={(e) => handleInput("email", e.target.value)}
          onBlur={(e) => handleBlur("email", e.target.value)}
          aria-invalid={touched.email && errors.email ? "true" : "false"}
          aria-describedby={
            touched.email && errors.email ? emailErrId : undefined
          }
          className={`field-input w-full px-3.5 py-2.5 ${
            touched.email && errors.email ? "user-invalid-fallback" : ""
          }`}
        />
        {touched.email && errors.email ? (
          <p id={emailErrId} className="field-error !block">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={messageId}
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          minLength={10}
          enterKeyHint="done"
          value={message}
          onChange={(e) => handleInput("message", e.target.value)}
          onBlur={(e) => handleBlur("message", e.target.value)}
          aria-invalid={touched.message && errors.message ? "true" : "false"}
          aria-describedby={
            touched.message && errors.message ? messageErrId : undefined
          }
          className={`field-input w-full px-3.5 py-3 ${
            touched.message && errors.message ? "user-invalid-fallback" : ""
          }`}
        />
        {touched.message && errors.message ? (
          <p id={messageErrId} className="field-error !block">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[48px] items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "submitting"
            ? "Sending..."
            : intent === "profile"
              ? "Send profile request"
              : intent === "briefing"
                ? "Send briefing request"
                : "Send message"}
        </button>
      </div>

      <div role="status" aria-live="polite" className="min-h-[1.5rem]">
        {status === "success" ? (
          <p className="border-l-2 border-accent bg-bg-subtle px-4 py-3 text-sm text-ink">
            {statusMessage}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="border-l-2 border-[#9B1C1C] bg-[#FDF2F2] px-4 py-3 text-sm text-[#9B1C1C]">
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
