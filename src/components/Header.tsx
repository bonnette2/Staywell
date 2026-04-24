"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, User as UserIcon, LogOut, Settings, MessageSquare,
  Home, Heart, Calendar, CreditCard,
} from "lucide-react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const isAccountPage = pathname?.startsWith("/account") || pathname?.startsWith("/messages");

  /*
   * TWO states only (public pages):
   *   1. Not scrolled → fully transparent, white text
   *   2. Scrolled     → white pill + blur, dark text
   */
  const onHero = !isScrolled && !isAccountPage;

  const primaryNavLinks = [
    { name: "Home",       href: "/" },
    { name: "About Us",   href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Contact Us", href: "/contact" },
  ];

  const userMenuItems = [
    { name: "Bookings", href: "/account/bookings", icon: Calendar },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Messages", href: "/messages",         icon: MessageSquare, badge: 3 },
    { name: "Payments", href: "/account/payments", icon: CreditCard },
  ];

  const accountMenuItems = [
    { name: "Account / Profile", href: "/account/profile", icon: UserIcon },
    { name: "Settings",          href: "/account/settings", icon: Settings },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        isAccountPage
          ? "bg-[#0a0f1b] border-b border-white/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.3)]"
          : "pt-3 px-4 md:px-8"
      }`}
    >
      {/* ── Pill container ── */}
      <div
        className={`grid grid-cols-2 lg:grid-cols-3 items-center min-h-[68px] transition-all duration-300 ${
          isAccountPage
            ? "w-full px-6 md:px-12"
            : onHero
              /* STATE 1 – transparent over hero image */
              ? "mx-auto rounded-full px-6 md:px-10 bg-transparent border border-transparent"
              /* STATE 2 – white pill over light content */
              : "mx-auto rounded-full px-6 md:px-10 bg-white/90 backdrop-blur-md border border-zinc-200/70 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.10)]"
        }`}
      >
        {/* ── Logo ── */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Home
              size={22}
              className={`transition-colors duration-300 ${
                isAccountPage ? "text-white" : onHero ? "text-white" : "text-[#013A37]"
              }`}
            />
            <span
              className={`text-[17px] font-bold tracking-tight transition-colors duration-300 ${
                isAccountPage ? "text-white" : onHero ? "text-white" : "text-zinc-900"
              }`}
            >
              StayWell
            </span>
          </Link>
        </div>

        {/* ── Center Nav ── */}
        <div className="hidden lg:flex items-center justify-center">
          <nav className="flex items-center gap-7">
            {primaryNavLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/" && (pathname === "" || pathname?.includes("/home")));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold py-2 transition-colors duration-300 ${
                    isActive
                      ? isAccountPage || onHero ? "text-white" : "text-zinc-900"
                      : isAccountPage || onHero ? "text-white/75 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full ${
                        isAccountPage || onHero ? "bg-white" : "bg-[#013A37]"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center justify-end gap-2 z-50">
          {!isAuthenticated ? (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  isAccountPage || onHero
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-bold bg-[#013A37] text-white px-5 py-2.5 rounded-full hover:bg-[#005244] transition-all duration-300 shadow-md"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2.5 p-1.5 pl-4 pr-1.5 rounded-full border transition-all duration-300 ${
                  isAccountPage || onHero
                    ? "border-white/20 bg-white/10 hover:bg-white/20"
                    : "border-zinc-200 bg-white hover:bg-zinc-50 shadow-sm"
                }`}
              >
                <Menu
                  size={16}
                  className={`transition-colors duration-300 ${isAccountPage || onHero ? "text-white" : "text-zinc-700"}`}
                />
                <span
                  className={`text-sm font-semibold hidden md:block transition-colors duration-300 ${
                    isAccountPage || onHero ? "text-white" : "text-zinc-800"
                  }`}
                >
                  {user?.name.split(" ")[0]}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20 bg-white/20">
                  {user?.avatar ? (
                    <NextImage src={user.avatar} alt={user.name} width={32} height={32} className="object-cover" />
                  ) : (
                    <UserIcon
                      size={15}
                      className={`transition-colors duration-300 ${isAccountPage || onHero ? "text-white" : "text-zinc-700"}`}
                    />
                  )}
                </div>
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-[260px] bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-100 py-2 z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon size={17} className="text-zinc-400" />
                              {item.name}
                            </div>
                            {item.badge && (
                              <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className="h-px bg-zinc-100 my-1 mx-4" />
                      <div className="py-1">
                        {accountMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <item.icon size={17} className="text-zinc-400" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="h-px bg-zinc-100 my-1 mx-4" />
                      <div className="py-1">
                        <button
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
                        >
                          <LogOut size={17} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden flex items-center p-2 rounded-full transition-colors ml-2 ${
              isAccountPage || onHero ? "text-white hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile Fullscreen Menu ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0a0f1b] z-40 flex flex-col pt-24 px-6 overflow-y-auto pb-10"
            >
              <div className="flex flex-col gap-8 max-w-sm mx-auto w-full">
                <div>
                  <h3 className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-4">Menu</h3>
                  <div className="flex flex-col gap-1">
                    {primaryNavLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-2xl font-bold text-white hover:text-[#A7DDD0] transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {isAuthenticated ? (
                  <>
                    <div>
                      <h3 className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-4">Activities</h3>
                      <div className="flex flex-col gap-1">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-bold text-white/90 hover:text-white transition-colors flex items-center justify-between py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon size={20} className="text-white/50" />
                              {item.name}
                            </div>
                            {item.badge && (
                              <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <h3 className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-4">Account</h3>
                      <div className="flex flex-col gap-1">
                        {accountMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-bold text-white/90 hover:text-white transition-colors flex items-center gap-3 py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon size={20} className="text-white/50" />
                            {item.name}
                          </Link>
                        ))}
                        <button
                          onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                          className="text-lg font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-3 py-2 mt-2 w-full text-left"
                        >
                          <LogOut size={20} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4 mt-2">
                    <Link
                      href="/login"
                      className="w-full py-4 text-center text-lg font-bold text-zinc-900 bg-white rounded-2xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full py-4 text-center text-lg font-bold text-white bg-[#013A37] rounded-2xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
