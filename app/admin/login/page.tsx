"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@saifurniture.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Accept default admin password or any matching password
    if (password === "admin@saifurniture" || password === "admin123" || password === "sai123") {
      localStorage.setItem("sai_admin_authenticated", "true");
      document.cookie = "sai_admin_auth=true; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Invalid admin credentials. Please use password: admin@saifurniture");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-charcoal-950">
      <div className="w-full max-w-md space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 items-center justify-center font-serif font-bold text-2xl text-amber-300 shadow-xl mx-auto">
            S
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">
            Sai Furniture Portal
          </h1>
          <p className="text-xs text-charcoal-400">
            Navegaon, Gadchiroli • Store Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-charcoal-900/90 border border-charcoal-800 p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-charcoal-800 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Lock className="h-4 w-4" />
            <span>Secure Admin Authentication</span>
          </div>

          {error && (
            <div className="rounded-xl bg-red-950/60 p-3 text-xs text-red-300 border border-red-800 font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-950 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-950 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-800/40 text-xs text-amber-300/80 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Demo Passcode:</span>
              </div>
              <code className="text-[11px] text-white bg-charcoal-950 px-2 py-0.5 rounded border border-brand-700/50">
                admin@saifurniture
              </code>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full bg-brand-700 hover:bg-brand-600 text-white font-bold"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </div>

        <div className="text-center text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} Sai Furniture. Protected Showroom Console.</p>
        </div>
      </div>
    </div>
  );
}
