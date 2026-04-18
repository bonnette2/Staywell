"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Search, 
  Phone, 
  Video, 
  Smile, 
  Camera, 
  Paperclip,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeConv, setActiveConv] = useState(1);

  const conversations = [
    { id: 1, name: "John Doe", time: "03:20 PM", preview: "Lorem ipsum doler isot lalang...", unread: 2, isActive: true },
    { id: 2, name: "John Doe", time: "03:20 PM", preview: "Great stay, thank you!" },
    { id: 3, name: "John Doe", time: "03:20 PM", preview: "Great stay, thank you!" },
    { id: 4, name: "John Doe", time: "03:20 PM", preview: "Great stay, thank you!" },
    { id: 5, name: "John Doe", time: "03:20 PM", preview: "Great stay, thank you!" },
    { id: 6, name: "John Doe", time: "03:20 PM", preview: "Great stay, thank you!" },
    { id: 7, name: "John Doe", time: "03:20 PM", preview: "Great stay, thank you!" },
    { id: 8, name: "John Doe", time: "03:20 PM", preview: "Great stay, thank you!" },
  ];

  return (
    <div className="h-[calc(100vh-140px)] w-full flex">
      {/* Main Container */}
      <div className="flex-1 bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex h-full">
        
        {/* Left Panel - Conversations List */}
        <div className="w-[320px] lg:w-[380px] flex-shrink-0 border-r border-zinc-200 flex flex-col bg-white h-full relative">
          
          {/* Search Bar */}
          <div className="p-6 pb-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="search message" 
                className="w-full bg-white border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-semibold outline-none focus:ring-1 focus:ring-[#0F3D2E] transition-all placeholder:text-zinc-400 shadow-sm"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between px-6 pt-2 shrink-0 border-b border-zinc-100">
            {["All", "Unread", "Archived"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-2 text-[14px] font-bold transition-all relative ${
                  activeTab === tab ? "text-[#0F3D2E]" : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="msg-tab" 
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0F3D2E] rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Conversations List */}
          <div className="overflow-y-auto flex-1 divide-y divide-zinc-100/60 custom-scrollbar">
            {conversations.map((conv) => (
              <div 
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={`flex gap-4 p-5 cursor-pointer transition-colors relative group ${
                  activeConv === conv.id ? 'bg-[#0F3D2E]/5' : 'hover:bg-zinc-50'
                }`}
              >
                {/* Active Indicator line */}
                {activeConv === conv.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0F3D2E]" />
                )}
                
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative border border-zinc-100 bg-zinc-100">
                   <Image src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop" fill alt="Avatar" className="object-cover" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-zinc-900 text-sm truncate">{conv.name}</h4>
                    <span className="text-[10px] font-bold text-zinc-400 shrink-0 ml-2 uppercase tracking-wide">{conv.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-[13px] font-semibold truncate ${
                      conv.unread && activeConv !== conv.id ? 'text-zinc-900' : 'text-zinc-500'
                    }`}>
                      {conv.preview}
                    </p>
                    {conv.unread && (
                      <span className="w-4 h-4 bg-[#0F3D2E] text-white text-[9px] font-bold flex items-center justify-center rounded-full shrink-0 ml-2">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Area */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          
          {/* Header */}
          <div className="h-[88px] flex items-center justify-between px-8 border-b border-zinc-100 shrink-0">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-100 relative">
                 <Image src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop" fill alt="John Doe" className="object-cover" />
               </div>
               <div>
                 <h2 className="text-[16px] font-extrabold text-zinc-900 leading-tight">John Doe</h2>
                 <p className="text-sm text-zinc-500 font-medium">Luxury Villa kigali</p>
               </div>
            </div>
            <div className="flex items-center gap-4 text-zinc-600">
               <button className="p-2 hover:bg-zinc-100 rounded-full transition"><Phone size={20} /></button>
               <button className="p-2 hover:bg-zinc-100 rounded-full transition"><Video size={22} /></button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar bg-white">
             
             {/* Host Sent Messages Block */}
             <div className="flex flex-col gap-2 items-end">
               <div className="bg-[#0F3D2E] text-white px-6 py-4 rounded-xl rounded-tr-sm max-w-[500px] shadow-sm transform-gpu transition-all">
                 <p className="text-[14px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
               </div>
               <div className="bg-[#0F3D2E] text-white px-6 py-4 rounded-xl rounded-tr-sm max-w-[500px] shadow-sm transform-gpu transition-all">
                 <p className="text-[14px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
               </div>
               <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1 mr-1">01:22 PM</span>
             </div>

             {/* Guest Received Message Block */}
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-100 shrink-0 relative mt-auto mb-6">
                  <Image src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop" fill alt="John Doe" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <div className="bg-white border border-zinc-200 text-zinc-800 px-6 py-5 rounded-2xl rounded-bl-sm max-w-[500px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <p className="text-[14px] leading-relaxed font-medium">Hello! Thank you so much. I'm really looking forward to it. Could you please share the check-in details?</p>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1 ml-1">01:22 PM</span>
                </div>
             </div>

             {/* Date Separator */}
             <div className="flex items-center justify-center my-6">
                <span className="text-xs font-semibold text-zinc-500 bg-white px-4">Today</span>
             </div>

             {/* More Host Sent Messages Block */}
             <div className="flex flex-col gap-3 items-end">
               <div className="bg-[#0F3D2E] text-white px-6 py-4 rounded-xl rounded-tr-sm max-w-[500px] shadow-sm">
                 <p className="text-[14px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
               </div>
               <div className="bg-[#0F3D2E] text-white px-6 py-4 rounded-xl rounded-tr-sm max-w-[500px] shadow-sm">
                 <p className="text-[14px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
               </div>
               <div className="bg-[#0F3D2E] text-white px-6 py-4 rounded-xl rounded-tr-sm max-w-[500px] shadow-sm">
                 <p className="text-[14px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
               </div>
               <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1 mr-1">01:22 PM</span>
             </div>

          </div>

          {/* Bottom Custom Input Box */}
          <div className="p-6 border-t border-zinc-100 bg-white shrink-0">
             <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 shadow-sm">
               <input 
                 type="text" 
                 placeholder="Type message" 
                 className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-zinc-500 text-zinc-800"
               />
               <button className="text-zinc-500 hover:text-zinc-800 transition p-1.5"><Smile size={20} /></button>
               <button className="text-zinc-500 hover:text-zinc-800 transition p-1.5"><Camera size={20} /></button>
               <button className="text-zinc-500 hover:text-zinc-800 transition p-1.5"><Paperclip size={20} /></button>
               <button className="bg-[#0F3D2E] text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#0a2e22] transition shrink-0 ml-1 shadow-sm">
                 <Send size={18} className="translate-y-[1px] -translate-x-[1px]" />
               </button>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
