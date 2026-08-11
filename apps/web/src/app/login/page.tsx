"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButtons } from "@/components/auth/SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = "Email is required";
    else if (!EMAIL_RE.test(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) {
        setError(res.error.message || "Sign in failed");
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
        <h1 className="text-[28px] font-semibold tracking-tight text-text-primary">Welcome back</h1>
        <p className="mt-1.5 text-[14.5px] text-text-secondary">
          Sign in to your ResendByte dashboard.
        </p>

        <SocialButtons className="mt-7" />

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/[0.08]" />
          <span className="text-[12px] font-medium uppercase tracking-wider text-text-tertiary">
            or continue with email
          </span>
          <span className="h-px flex-1 bg-black/[0.08]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[13px] font-medium text-text-secondary">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-text-tertiary" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[13px] font-medium text-text-secondary">
                Password
              </label>
              <a href="#" className="text-[12.5px] font-medium text-brand-600 no-underline hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-text-tertiary" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
            {fieldErrors.password && <span className="text-[13px] text-danger">{fieldErrors.password}</span>}
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
              "Signing in…"
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-7 text-center text-[14px] text-text-secondary">
          New to ResendByte?{" "}
          <Link href="/signup" className="font-semibold text-brand-600 no-underline hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}