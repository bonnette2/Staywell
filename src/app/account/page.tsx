"use client";

import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, CreditCard, Settings, Bell, Shield, Calendar, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AccountPage() {
  const { user } = useAuth();

  const accountCards = [
    { 
      title: "Personal info", 
      desc: "Provide personal details and how we can reach you", 
      icon: User, 
      href: "/account/profile" 
    },
    { 
      title: "Payments & payouts", 
      desc: "Review payments, payouts, coupons, and gift cards", 
      icon: CreditCard, 
      href: "/account/payments" 
    },
    { 
      title: "Login & security", 
      desc: "Update your password and secure your account", 
      icon: Shield, 
      href: "/account/settings" 
    },
    { 
      title: "Notifications", 
      desc: "Choose notification preferences and how you want to be contacted", 
      icon: Bell, 
      href: "/account/settings" 
    },
    { 
      title: "My Bookings", 
      desc: "View and manage your upcoming and past trips", 
      icon: Calendar, 
      href: "/account/bookings" 
    },
    { 
      title: "Wishlist", 
      desc: "View and manage your saved properties", 
      icon: Heart, 
      href: "/account/wishlist" 
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-zinc-900 mb-2">Account</h1>
            <p className="text-lg font-medium text-zinc-500">
              <span className="font-bold text-zinc-800">{user?.name}</span>, {user?.email} · <Link href="/account/profile" className="underline font-bold text-zinc-800">Go to profile</Link>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={card.href}
                  className="block p-8 rounded-[2rem] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/20 hover:shadow-2xl hover:shadow-zinc-200/40 transition-all group h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-800 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <card.icon size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 mb-2">{card.title}</h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">{card.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
