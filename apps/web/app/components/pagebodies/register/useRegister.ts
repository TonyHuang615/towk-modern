"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";

// Shared registration logic for all 5 design bodies — only the markup differs.
// Posts to /api/member/register, then auto signs-in and redirects to /member.
export function useRegister() {
  const en = useLocale() === "en";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const msg = (code?: string): string => {
    const m: Record<string, string> = {
      weak_password: en ? "Password must be at least 8 characters." : "密码至少需要 8 位。",
      password_mismatch: en ? "The two passwords do not match." : "两次输入的密码不一致。",
      invalid_email: en ? "Please enter a valid email address." : "请输入有效的邮箱地址。",
      email_taken: en ? "This email is already registered." : "该邮箱已被注册。",
      register_failed: en ? "Registration failed, please try again." : "注册失败，请稍后重试。",
    };
    return (code && m[code]) || (en ? "Registration failed." : "注册失败。");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError(msg("weak_password"));
      return;
    }
    if (password !== confirm) {
      setError(msg("password_mismatch"));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/member/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword: confirm }),
      });
      if (res.ok) {
        await signIn("credentials", { email, password, redirect: false });
        window.location.href = en ? "/en/member" : "/member";
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(msg(data?.error));
    } catch {
      setError(msg("register_failed"));
    }
    setLoading(false);
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirm, setConfirm,
    loading, error,
    submit,
  };
}
