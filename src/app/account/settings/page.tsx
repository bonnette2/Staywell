"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, Shield, Bell, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 mb-8">
            <Link href="/account" className="hover:text-zinc-600">Account</Link>
            <ChevronRight size={14} />
            <span className="text-zinc-900">Login & Security</span>
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 mb-12">Login & Security</h1>

          <div className="space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                <Shield size={24} className="text-primary" />
                Security
              </h2>
              <div className="p-8 rounded-[2.5rem] border border-zinc-100 bg-zinc-50/30 flex items-center justify-between gap-6">
                <div>
                  <h3 className="font-bold text-zinc-800 mb-1">Password</h3>
                  <p className="text-sm text-zinc-500 font-medium">Last updated 2 months ago</p>
                </div>
                <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl font-bold text-sm hover:bg-zinc-50 transition-all shadow-sm">
                  Update
                </button>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                <Bell size={24} className="text-primary" />
                Notifications
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Promotional emails", desc: "Receive tips, news, and offers from StayWell." },
                  { title: "Booking updates", desc: "Get notified about your requests and activity." },
                  { title: "Account activity", desc: "Get notifications about your account security and login activity." }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] border border-zinc-100 flex items-center justify-between gap-6">
                    <div>
                      <h3 className="font-bold text-zinc-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
