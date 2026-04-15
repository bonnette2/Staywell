"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={`text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>
          StayWell
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all group flex flex-col items-center hover:opacity-100 ${
                  isScrolled 
                    ? (isActive ? 'text-[#065f46] font-bold' : 'text-foreground hover:text-primary opacity-70') 
                    : (isActive ? 'text-white opacity-100 font-bold scale-110' : 'text-white/70 hover:opacity-100')
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="underline"
                    className={`h-0.5 w-full bg-current rounded-full mt-1`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#"
            className={`text-sm font-medium transition-colors hover:opacity-80 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white'}`}
          >
            Sign In
          </Link>
          <Link
            href="#"
            className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-hover transition-colors shadow-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
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
          <Link
            href="#"
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
