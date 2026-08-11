"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButtons } from "@/components/auth/SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordChecks = [
  { label: "8+ characters", test: (pw: string) => pw.length >= 8 },
  { label: "1+ number", test: (pw: string) => /\d/.test(pw) },
  { label: "1+ letter", test: (pw: string) => /[a-zA-Z]/.test(pw) },
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string }>({});

  const validate = () => {
    const errors: typeof fieldErrors = {};
    if (!name.trim()) errors.name = "Full name is required";
    if (!email) errors.email = "Email is required";
    else if (!EMAIL_RE.test(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters";
    if (!confirm) errors.confirm = "Confirm your password";
    else if (confirm !== password) errors.confirm = "Passwords do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
      });
      if (res.error) {
        setError(res.error.message || "Sign up failed");
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="animate-slide-up">
        <h1 className="text-[28px] font-semibold tracking-tight text-text-primary">Create your account</h1>
        <p className="mt-1.5 text-[14.5px] text-text-secondary">
          Start sending in five minutes. Free forever tier, no credit card.
        </p>

        <SocialButtons className="mt-7" />

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/[0.08]" />
          <span className="text-[12px] font-medium uppercase tracking-wider text-text-tertiary">
            or sign up with email
          </span>
          <span className="h-px flex-1 bg-black/[0.08]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-[13px] font-medium text-text-secondary">
              Full name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-text-tertiary" />
              <input
                id="name"
                type="text"
                placeholder="Ada Lovelace"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) setFieldErrors((f) => ({ ...f, name: undefined }));
                }}
                className={`input-glass w-full py-2.5 pl-10 pr-3.5 text-[15px] text-text-primary placeholder:text-text-tertiary ${
                  fieldErrors.name ? "border-danger/50" : ""
                }`}
              />
            </div>
            {fieldErrors.name && <span className="text-[13px] text-danger">{fieldErrors.name}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[13px] font-medium text-text-secondary">
              Work email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-text-tertiary" />
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: undefined }));
                }}
                className={`input-glass w-full py-2.5 pl-10 pr-3.5 text-[15px] text-text-primary placeholder:text-text-tertiary ${
                  fieldErrors.email ? "border-danger/50" : ""
                }`}
              />
            </div>
            {fieldErrors.email && <span className="text-[13px] text-danger">{fieldErrors.email}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[13px] font-medium text-text-secondary">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-text-tertiary" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: undefined }));
                }}
                className={`input-glass w-full py-2.5 pl-10 pr-11 text-[15px] text-text-primary placeholder:text-text-tertiary ${
                  fieldErrors.password ? "border-danger/50" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors hover:text-text-primary"
              >
                {showPassword ? <EyeOff className="h-[17px] w-[17px]" /> : <Eye className="h-[17px] w-[17px]" />}
              </button>
            </div>
            <div className="mt-1.5 flex gap-4">
              {passwordChecks.map((check) => {
                const passed = check.test(password);
                return (
                  <span
                    key={check.label}
                    className={`flex items-center gap-1 text-[12px] font-medium ${
                      password ? (passed ? "text-success" : "text-text-tertiary") : "text-text-tertiary"
                    }`}
                  >
                    {passed ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" />}
                    {check.label}
                  </span>
                );
              })}
            </div>
            {fieldErrors.password && <span className="text-[13px] text-danger">{fieldErrors.password}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm" className="text-[13px] font-medium text-text-secondary">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-text-tertiary" />
              <input
                id="confirm"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  if (fieldErrors.confirm) setFieldErrors((f) => ({ ...f, confirm: undefined }));
                }}
                className={`input-glass w-full py-2.5 pl-10 pr-3.5 text-[15px] text-text-primary placeholder:text-text-tertiary ${
                  fieldErrors.confirm ? "border-danger/50" : ""
                }`}
              />
            </div>
            {fieldErrors.confirm && <span className="text-[13px] text-danger">{fieldErrors.confirm}</span>}
          </div>

          {error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-[13px] text-danger">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group mt-1 inline-flex items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-accent-hover disabled:opacity-60"
          >
            {loading ? (
              "Creating account…"
            ) : (
              <>
                Create account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-[12.5px] leading-relaxed text-text-tertiary">
          By signing up you agree to our{" "}
          <a href="#" className="text-text-secondary no-underline hover:underline">Terms</a> and{" "}
          <a href="#" className="text-text-secondary no-underline hover:underline">Privacy Policy</a>.
        </p>

        <p className="mt-5 text-center text-[14px] text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-600 no-underline hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}