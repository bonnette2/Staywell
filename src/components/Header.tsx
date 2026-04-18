"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User as UserIcon, LogOut, Heart, Calendar, CreditCard, Bell, Shield, MessageSquare, Home } from "lucide-react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Handle preloader
    if (!sessionStorage.getItem("preloader-shown")) {
      setIsPreloading(true);
    }
    const handlePreloaderFinished = () => setIsPreloading(false);
    window.addEventListener("preloader-finished", handlePreloaderFinished);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("preloader-finished", handlePreloaderFinished);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Contact us", href: "/contact" },
  ];

  const userMenuItems = [
    { name: "Profile", href: "/account/profile", icon: UserIcon },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Bookings", href: "/account/bookings", icon: Calendar },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Payment Methods", href: "/account/payments", icon: CreditCard },
    { name: "Notifications", href: "/account/settings", icon: Bell },
    { name: "Security", href: "/account/settings", icon: Shield },
  ];

  const isHome = pathname === "/";
  const showSolidNav = isScrolled || !isHome;

  if (isPreloading) return null;

  return (
    <header
      className="fixed top-0 left-0 w-full z-[9999] transition-all duration-300 pt-4 px-4 md:pt-6 md:px-6 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between transition-all duration-300 pointer-events-auto bg-[#1c2533]/50 backdrop-blur-lg shadow-2xl rounded-full border border-white/5 py-3.5 px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Home size={20} className="text-white" />
          <span className="text-xl font-medium tracking-wide text-white transition-colors">
            StayWell
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.name === "Home" && pathname?.includes("/guest/home"));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wide transition-all group flex flex-col items-center hover:opacity-100 ${
                  isActive ? 'text-white font-semibold' : 'text-white/70 hover:opacity-100'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="underline"
                    className="h-0.5 w-full bg-white rounded-full mt-1.5"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Messages icon */}
              <Link
                href="/messages"
                className="relative p-2 rounded-full transition-all hover:scale-105 text-white/90 hover:text-white hover:bg-white/10"
              >
                <MessageSquare size={22} />
                {/* Unread badge */}
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow">3</span>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full border border-transparent transition-all hover:shadow-md hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                  {user?.avatar ? (
                    <NextImage src={user.avatar} alt={user.name} width={32} height={32} className="object-cover" />
                  ) : (
                    <UserIcon size={16} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-white">
                  {user?.name.split(" ")[0]}
                </span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-zinc-100 py-3 z-50 overflow-hidden"
                    >
                      <div className="px-5 py-3 mb-2 border-b border-zinc-50">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-zinc-800 truncate">{user?.email}</p>
                      </div>
                      
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-zinc-600 hover:text-primary hover:bg-zinc-50 transition-all"
                        >
                          <item.icon size={18} />
                          {item.name}
                        </Link>
                      ))}
                      
                      <div className="h-px bg-zinc-50 my-2" />
                      
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
              <Link
                href="/login"
                className="text-sm font-medium transition-colors hover:opacity-80 text-white"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:bg-[#064e3b] transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 transition-colors text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 pointer-events-auto mt-2 rounded-2xl border border-zinc-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-slate-100 my-2" />
          {isAuthenticated ? (
            <>
              {userMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-base font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-3"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-base font-medium text-primary hover:text-[#064e3b] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
