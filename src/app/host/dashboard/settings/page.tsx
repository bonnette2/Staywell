"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard,
  Camera,
  Check,
  ShieldCheck,
  Mail,
  Smartphone
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { id: "Profile", icon: User, label: "Profile Information" },
    { id: "Security", icon: Lock, label: "Security & Password" },
    { id: "Notifications", icon: Bell, label: "Notification Preferences" },
    { id: "Billing", icon: CreditCard, label: "Billing & Payouts" },
  ];

  return (
    <div className="space-y-8 pb-10 max-w-6xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">Settings</h1>
        <p className="text-zinc-500 font-medium text-sm">Manage your account preferences and configurations</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Side Navigation */}
        <div className="w-full md:w-[280px] shrink-0 space-y-2">
          {tabs.map((tab) => {
             const isActive = activeTab === tab.id;
             return (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 font-semibold text-sm outline-none focus:outline-none focus:ring-0 select-none active:scale-[0.98] ${
                   isActive 
                     ? "bg-white text-[#002521] shadow-sm border border-zinc-100/80" 
                     : "text-zinc-500 hover:text-zinc-800 hover:bg-white/50 border border-transparent"
                 }`}
               >
                 <tab.icon size={20} className={isActive ? "text-[#002521]" : "text-zinc-400"} />
                 {tab.label}
               </button>
             )
          })}
        </div>

        {/* Right Side Main Content */}
        <div className="flex-1 w-full bg-white border border-zinc-200/80 rounded-2xl shadow-sm p-8 lg:p-10 min-h-[600px]">
           <AnimatePresence mode="wait">
           {/* 1. Profile Information */}
           {activeTab === "Profile" && (
             <motion.div 
               key="Profile"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="space-y-10"
             >
               <div>
                 <h2 className="text-xl font-extrabold text-zinc-900">Profile Information</h2>
                 <p className="text-sm text-zinc-500 font-medium mt-1">Update your personal information and public profile.</p>
               </div>
               
               <div className="flex items-center gap-8 pb-8 border-b border-zinc-100">
                 <div className="relative w-24 h-24 rounded-full overflow-hidden border border-zinc-200 shadow-sm shrink-0 bg-zinc-50 group cursor-pointer">
                   <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" fill alt="Profile" className="object-cover" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Camera className="text-white" size={24} />
                   </div>
                 </div>
                 <div className="space-y-3">
                   <button className="bg-white border border-zinc-200 text-zinc-800 text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-zinc-50 transition shadow-sm">
                     Change Photo
                   </button>
                   <p className="text-xs text-zinc-400 font-medium">JPG, GIF or PNG. Max size of 5MB.</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-zinc-700">First Name</label>
                   <input type="text" defaultValue="John" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-zinc-700">Last Name</label>
                   <input type="text" defaultValue="Doe" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-zinc-700">Email Address</label>
                   <input type="email" defaultValue="johndoe@example.com" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-zinc-700">Phone Number</label>
                   <input type="tel" defaultValue="+250 788 123 456" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm" />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-sm font-bold text-zinc-700">Bio</label>
                   <textarea rows={4} defaultValue="Premium real estate host based in Kigali, Rwanda. Passionate about offering luxurious stays." className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm resize-none"></textarea>
                 </div>
               </div>

               <div className="flex justify-end pt-4">
                 <button className="bg-[#002521] text-white flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-[#002521]/90 transition-all">
                   <Check size={18} />
                   Save Changes
                 </button>
               </div>
             </motion.div>
           )}

           {/* 2. Security & Password */}
           {activeTab === "Security" && (
             <motion.div 
               key="Security"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="space-y-10"
             >
               <div>
                 <h2 className="text-xl font-extrabold text-zinc-900">Security & Password</h2>
                 <p className="text-sm text-zinc-500 font-medium mt-1">Manage your password and secure your account.</p>
               </div>

               <div className="space-y-6 max-w-lg">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-zinc-700">Current Password</label>
                   <input type="password" placeholder="••••••••" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-zinc-700">New Password</label>
                   <input type="password" placeholder="Enter new password" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-zinc-700">Confirm Password</label>
                   <input type="password" placeholder="Confirm new password" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all text-zinc-900 font-medium shadow-sm" />
                 </div>
                 
                 <div className="pt-2">
                   <button className="bg-[#002521] text-white px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-[#002521]/90 transition-all">
                     Update Password
                   </button>
                 </div>
               </div>

               <div className="pt-8 border-t border-zinc-100">
                 <div className="flex items-center justify-between p-6 border border-zinc-200 rounded-xl bg-zinc-50/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600 mt-1">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-zinc-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-zinc-500 font-medium mt-1">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <button className="bg-white border border-zinc-200 text-zinc-800 text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-zinc-50 transition shadow-sm">
                      Enable 2FA
                    </button>
                 </div>
               </div>
             </motion.div>
           )}

           {/* 3. Notifications */}
           {activeTab === "Notifications" && (
             <motion.div 
               key="Notifications"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="space-y-10"
             >
               <div>
                 <h2 className="text-xl font-extrabold text-zinc-900">Notification Preferences</h2>
                 <p className="text-sm text-zinc-500 font-medium mt-1">Choose how you want to be notified about activity.</p>
               </div>

               <div className="space-y-6">
                 
                 <div className="flex items-center justify-between py-4 border-b border-zinc-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-zinc-100 p-2.5 rounded-full text-zinc-600 mt-1">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-zinc-900">Email Notifications</h4>
                        <p className="text-sm text-zinc-500 font-medium mt-1">Receive booking updates and messages via email.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-[#002521] rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between py-4 border-b border-zinc-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-zinc-100 p-2.5 rounded-full text-zinc-600 mt-1">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-zinc-900">Push Notifications</h4>
                        <p className="text-sm text-zinc-500 font-medium mt-1">Receive direct alerts on your mobile device.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-[#002521] rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between py-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-zinc-100 p-2.5 rounded-full text-zinc-600 mt-1">
                        <Bell size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-zinc-900">Marketing & Promos</h4>
                        <p className="text-sm text-zinc-500 font-medium mt-1">Get updates on new StayWell features and offers.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-zinc-200 rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                    </div>
                 </div>

               </div>
               
               <div className="flex justify-end pt-4">
                 <button className="bg-[#002521] text-white px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-[#002521]/90 transition-all">
                   Save Preferences
                 </button>
               </div>
             </motion.div>
           )}

           {/* 4. Billing */}
           {activeTab === "Billing" && (
             <motion.div 
               key="Billing"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="space-y-10"
             >
               <div>
                 <h2 className="text-xl font-extrabold text-zinc-900">Billing & Payouts</h2>
                 <p className="text-sm text-zinc-500 font-medium mt-1">Manage your payment methods and payout details.</p>
               </div>

               <div className="border border-zinc-200 rounded-xl p-6 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                 <div>
                   <h4 className="font-extrabold text-zinc-900">Primary Payout Method</h4>
                   <div className="font-medium text-zinc-500 text-sm mt-1 flex items-center gap-2">
                     <div className="w-8 h-5 bg-zinc-200 rounded-[2px]"></div>
                     Bank Account ending in 4576
                   </div>
                 </div>
                 <button className="bg-white border border-zinc-200 text-zinc-800 text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-zinc-50 transition shadow-sm">
                   Update Method
                 </button>
               </div>

               <div>
                 <h3 className="font-bold text-zinc-900 mb-4">Payout History</h3>
                 <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-widest font-bold">
                         <th className="px-6 py-4 border-b border-zinc-200">Date</th>
                         <th className="px-6 py-4 border-b border-zinc-200">Amount</th>
                         <th className="px-6 py-4 border-b border-zinc-200">Status</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-100 text-sm font-semibold">
                       <tr className="hover:bg-zinc-50 transition">
                         <td className="px-6 py-4 text-zinc-800">12 - 07 - 2025</td>
                         <td className="px-6 py-4 text-zinc-800">RF 150,000</td>
                         <td className="px-6 py-4 text-emerald-600">Completed</td>
                       </tr>
                       <tr className="hover:bg-zinc-50 transition">
                         <td className="px-6 py-4 text-zinc-800">10 - 07 - 2025</td>
                         <td className="px-6 py-4 text-zinc-800">RF 85,000</td>
                         <td className="px-6 py-4 text-emerald-600">Completed</td>
                       </tr>
                       <tr className="hover:bg-zinc-50 transition">
                         <td className="px-6 py-4 text-zinc-800">01 - 07 - 2025</td>
                         <td className="px-6 py-4 text-zinc-800">RF 200,000</td>
                         <td className="px-6 py-4 text-emerald-600">Completed</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>

             </motion.div>
           )}
           </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
