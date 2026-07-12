"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PREMIUM_IMAGE_QUALITY } from "@/components/OptimizedImage";

/**
 * Admin login form — fields intentionally disable browser autofill
 * so credentials must be entered manually.
 */
export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get("reason") === "inactive") {
      setInfo("Your session has expired due to inactivity. Please sign in again.");
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Invalid email or password. Please try again.");
        return;
      }

      const nextPath = searchParams.get("next");
      const destination =
        nextPath && nextPath.startsWith("/admin") && nextPath !== "/admin/login"
          ? nextPath
          : "/admin";

      router.replace(destination);
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-card admin-login__card">
        <div className="admin-login__brand">
          <Image
            src="/logo.jpg"
            alt="Grooming Lounge"
            width={72}
            height={72}
            className="admin-login__logo"
            sizes="72px"
            quality={PREMIUM_IMAGE_QUALITY}
            priority
          />
          <p className="admin-login__eyebrow">Grooming Lounge</p>
          <h1 className="admin-login__title">Administrator Login</h1>
          <p className="admin-login__desc">
            Sign in to manage photos, staff, themes, and announcements.
          </p>
        </div>

        <form className="admin-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
          {/* Decoy fields reduce aggressive browser autofill */}
          <input
            type="text"
            name="username_decoy"
            autoComplete="username"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", opacity: 0, height: 0, width: 0, pointerEvents: "none" }}
          />
          <input
            type="password"
            name="password_decoy"
            autoComplete="current-password"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", opacity: 0, height: 0, width: 0, pointerEvents: "none" }}
          />

          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="Enter your email"
              required
              disabled={loading}
              defaultValue=""
            />
          </label>

          <label>
            Password
            <span className="admin-login__password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                required
                minLength={6}
                disabled={loading}
                defaultValue=""
              />
              <button
                type="button"
                className="admin-login__toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </span>
          </label>

          {info ? (
            <p className="form-success admin-login__error" role="status">
              {info}
            </p>
          ) : null}

          {error ? (
            <p className="form-error admin-login__error" role="alert">
              {error}
            </p>
          ) : null}

          <button className="btn btn--primary btn--full admin-login__submit" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="admin-login__spinner" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
