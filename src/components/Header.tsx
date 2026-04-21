"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, User as UserIcon, LogOut, Settings, MessageSquare, 
  Home, Heart, Calendar, CreditCard
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // Route & Styling Logic
  const isAccountPage = pathname?.startsWith("/account") || pathname?.startsWith("/messages");
  
  // Refined blur background blend
  const headerBgClass = isAccountPage 
    ? "bg-[#0a0f1b] border-b border-white/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.3)]" 
    : isScrolled 
      ? "bg-[#0a0f1b]/80 backdrop-blur-[20px]" 
      : "bg-transparent";

  const textColorClass = "text-white";

  // Navigation Data
  const primaryNavLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Contact Us", href: "/contact" },
  ];

  const userMenuItems = [
    { name: "Bookings", href: "/account/bookings", icon: Calendar },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Messages", href: "/messages", icon: MessageSquare, badge: 3 },
    { name: "Payments", href: "/account/payments", icon: CreditCard },
  ];

  const accountMenuItems = [
    { name: "Account / Profile", href: "/account/profile", icon: UserIcon },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ease-in-out ${headerBgClass}`}>
      <div className="w-full px-6 md:px-12 grid grid-cols-2 lg:grid-cols-3 items-center min-h-[72px] xl:min-h-[80px]">
        
        {/* ================= LEFT COLUMN: Logo ================= */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-3 z-50 group">
            <div className="flex items-center justify-center transition-transform group-hover:scale-110">
               <Home size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              StayWell
            </span>
          </Link>
        </div>

        {/* ================= CENTER COLUMN: Primary Navigation ================= */}
        <div className="hidden lg:flex items-center justify-center">
          <nav className="flex items-center gap-7 pt-1">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname === `${link.href}/` || (link.href === "/" && (pathname === "" || pathname?.includes("/home")));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-bold tracking-wide transition-opacity py-2 ${
                    isActive ? "text-white opacity-100" : "text-white opacity-80 hover:opacity-100"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="primary-nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[4px] rounded-sm bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ================= RIGHT COLUMN: User Actions ================= */}
        <div className="flex items-center justify-end z-50">
          {!isAuthenticated ? (
            // GUEST ACTIONS
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/login"
                className={`text-sm font-bold transition-all px-4 py-2 rounded-full hover:bg-white/10 ${
                  "text-white/80 hover:text-white"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-bold bg-primary text-white px-6 py-2.5 rounded-full hover:bg-[#064e3b] transition-all shadow-md"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            // AUTHENTICATED ACTIONS
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 p-1.5 pl-3.5 pr-1.5 rounded-full border transition-all hover:shadow-md ${
                  "border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                <Menu size={18} className={textColorClass} />
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ml-1 hidden md:block ${textColorClass}`}>
                    {user?.name.split(" ")[0]}
                  </span>
                  <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20 bg-white/20`}>
                    {user?.avatar ? (
                      <NextImage src={user.avatar} alt={user.name} width={32} height={32} className="object-cover" />
                    ) : (
                      <UserIcon size={16} className={textColorClass} />
                    )}
                  </div>
                </div>
              </button>

              {/* Desktop Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-[260px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 py-2 z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between px-5 py-2.5 text-sm font-bold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon size={18} className="text-zinc-400" />
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
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <item.icon size={18} className="text-zinc-400" />
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <div className="h-px bg-zinc-100 my-1 mx-4" />

                      <div className="py-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ================= MOBILE HAMBURGER TOGGLE ================= */}
          <button
            className={`lg:hidden flex items-center p-2 rounded-full transition-colors ml-4 hover:bg-white/10 text-white ${textColorClass}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} className="text-white" /> : <Menu size={26} />}
          </button>
        </div>

        {/* ================= MOBILE FULLSCREEN MENU ================= */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
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
                        className="text-2xl font-bold text-white hover:text-primary transition-colors py-2"
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
                              <item.icon size={20} className="text-white/60" />
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
                        <h3 className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-4">Settings</h3>
                        <div className="flex flex-col gap-1">
                          {accountMenuItems.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="text-lg font-bold text-white/90 hover:text-white transition-colors flex items-center gap-3 py-2"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <item.icon size={20} className="text-white/60" />
                              {item.name}
                            </Link>
                          ))}
                          <button
                            onClick={() => {
                              logout();
                              setIsMobileMenuOpen(false);
                            }}
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
                      className="w-full py-4 text-center text-lg font-bold text-[#1c2533] bg-white rounded-2xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full py-4 text-center text-lg font-bold text-white bg-primary rounded-2xl"
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
