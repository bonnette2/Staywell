"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Home, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HostDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Dashboard", href: "/host/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/host/dashboard/properties", icon: Home },
    { name: "Bookings", href: "/host/dashboard/bookings", icon: Calendar },
    { name: "Transactions", href: "/host/dashboard/transactions", icon: CreditCard },
    { name: "Messages", href: "/host/dashboard/messages", icon: MessageSquare },
    { name: "Analytics", href: "/host/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/host/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7F6] text-zinc-900 font-sans">
      {/* Sidebar */}
      <aside className="w-[200px] xl:w-[240px] bg-[#002521] text-white flex flex-col shrink-0 h-screen sticky top-0 overflow-y-auto no-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.1)] border-r border-white/5">
        <div className="p-8 flex items-center gap-4 shrink-0">
          <div className="flex items-center justify-center transition-transform hover:scale-110">
            <Home size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">StayWell</span>
        </div>

        <nav className="flex-1 space-y-1 mt-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/host/dashboard" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-4 px-8 py-4 transition-all font-medium text-sm group ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-y-0 left-0 right-0 bg-black/10 border-l-[4px] border-white rounded-none" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <link.icon size={20} className={`relative z-10 shrink-0 ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"}`} />
                <span className="relative z-10 tracking-wide">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 shrink-0">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-[70px] bg-white border-b border-zinc-100 flex items-center justify-between px-10 flex-shrink-0 sticky top-0 z-20">
          <div className="relative w-[420px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search properties, bookings, or guests..." 
              suppressHydrationWarning
              className="w-full bg-zinc-50 border border-zinc-100 rounded-lg py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-[#002521]/10 transition-all placeholder:text-zinc-400"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 border border-zinc-100 rounded-full flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-all">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-100">
              <div className="text-right">
                <p className="text-sm font-bold text-zinc-900 leading-none">{user?.name || "John Doe"}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Premium Host</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-100 shadow-sm">
                <Image 
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"} 
                  alt="Avatar" 
                  width={40} 
                  height={40} 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 lg:p-10 relative overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
