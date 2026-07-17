"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "./Button";

type FieldErrors = Partial<Record<"name" | "restaurant" | "email", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const LOCATION_OPTIONS = ["1", "2–5", "6–20", "21+"];

const inputBase =
  "w-full rounded-xl border border-hairline bg-panel-2 px-4 py-3 text-sm text-ink placeholder:text-muted-2 transition-colors focus:border-[color:var(--amber)] focus-visible:outline-none";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(data: {
    name: string;
    restaurant: string;
    email: string;
  }): FieldErrors {
    const next: FieldErrors = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.restaurant.trim()) next.restaurant = "Please enter your restaurant.";
    if (!data.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      next.email = "Please enter a valid email.";
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      restaurant: String(fd.get("restaurant") ?? ""),
      locations: String(fd.get("locations") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const validationErrors = validate(payload);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-2xl border border-[color:rgba(45,212,191,0.35)] bg-[linear-gradient(180deg,rgba(45,212,191,0.08),transparent)] p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="text-teal" size={40} aria-hidden="true" />
        <h3 className="text-xl font-bold text-ink">Thanks — we&apos;ll be in touch.</h3>
        <p className="max-w-sm text-pretty text-muted">
          We&apos;ll reach out to set up a demo and, if you&apos;re ready, a one-shift pilot on your
          existing setup.
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-describedby="form-note">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" className={inputBase} placeholder="Alex Rivera" aria-invalid={!!errors.name} />
        </Field>
        <Field label="Restaurant" htmlFor="restaurant" error={errors.restaurant}>
          <input id="restaurant" name="restaurant" type="text" autoComplete="organization" className={inputBase} placeholder="The Copper Table" aria-invalid={!!errors.restaurant} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Number of locations" htmlFor="locations">
          <select id="locations" name="locations" className={`${inputBase} appearance-none`} defaultValue="1">
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Work email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={inputBase} placeholder="alex@coppertable.com" aria-invalid={!!errors.email} />
        </Field>
      </div>

      <Field label="Anything we should know?" htmlFor="message" optional>
        <textarea id="message" name="message" rows={3} className={`${inputBase} resize-none`} placeholder="Cameras, POS, biggest bottleneck…" />
      </Field>

      {serverError && (
        <p className="text-sm text-alert" role="alert">
          {serverError}
        </p>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Book a demo"
          )}
        </Button>
        <p id="form-note" className="text-xs text-muted-2">
          No spam. We reply within one business day.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1.5 text-xs font-normal text-muted-2">optional</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-alert" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
