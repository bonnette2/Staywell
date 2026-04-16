"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Camera, Save, Check, X, Pencil,
  MapPin, FileText, BadgeCheck, CalendarDays, User,
  Mail, Phone,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/* ─── Types ─── */
interface EditableField {
  label: string;
  value: string;
  key: string;
  type?: string;
  icon: React.ElementType;
  placeholder: string;
}

/* ─── Inline editable row ─── */
function EditableRow({
  field,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  draftValue,
  saved,
}: {
  field: EditableField;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (v: string) => void;
  draftValue: string;
  saved: boolean;
}) {
  return (
    <div className="group py-5 border-b border-zinc-50 last:border-0">
      <div className="flex items-start justify-between gap-4">
        {/* Left: label + value/input */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <field.icon size={14} className="text-zinc-400 shrink-0" />
            <span className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.12em]">{field.label}</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <input
                  type={field.type ?? "text"}
                  value={draftValue}
                  onChange={(e) => onChange(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 bg-zinc-50 border-2 border-primary/30 rounded-2xl text-sm font-bold outline-none focus:border-primary transition-colors"
                  placeholder={field.placeholder}
                  suppressHydrationWarning
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={onSave}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-[#064e3b] transition-all"
                  >
                    <Check size={13} /> Save
                  </button>
                  <button
                    onClick={onCancel}
                    className="flex items-center gap-1.5 px-4 py-2 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-xl hover:bg-zinc-200 transition-all"
                  >
                    <X size={13} /> Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-bold text-zinc-800 truncate">{field.value || <span className="text-zinc-400 font-medium italic">Not set</span>}</span>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 text-[10px] font-black text-primary"
                  >
                    <Check size={11} /> Saved
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edit button */}
        {!isEditing && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700 text-xs font-bold transition-all opacity-0 group-hover:opacity-100 shrink-0"
          >
            <Pencil size={13} /> Edit
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Section card ─── */
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-lg shadow-zinc-100/60 overflow-hidden">
      <div className="px-7 pt-6 pb-4 border-b border-zinc-50">
        <h2 className="text-base font-black text-zinc-800 uppercase tracking-widest">{title}</h2>
      </div>
      <div className="px-7 pb-4">{children}</div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name ?? "John Doe",
    email: user?.email ?? "john@example.com",
    phone: "+250 78 000 0000",
    location: "Kigali, Rwanda",
    bio: "Passionate traveler and home lover. Always on the hunt for the perfect stay.",
  });

  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const startEdit = (key: string) => {
    setDrafts((d) => ({ ...d, [key]: profile[key as keyof typeof profile] }));
    setEditing((e) => ({ ...e, [key]: true }));
    setSaved((s) => ({ ...s, [key]: false }));
  };

  const cancelEdit = (key: string) => {
    setEditing((e) => ({ ...e, [key]: false }));
  };

  const saveEdit = (key: string) => {
    setProfile((p) => ({ ...p, [key]: drafts[key] }));
    setEditing((e) => ({ ...e, [key]: false }));
    setSaved((s) => ({ ...s, [key]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2500);
  };

  const personalFields: EditableField[] = [
    { key: "name",  label: "Full Name",     icon: User,  type: "text",  placeholder: "Your full name",    value: profile.name },
    { key: "email", label: "Email Address", icon: Mail,  type: "email", placeholder: "Your email",        value: profile.email },
    { key: "phone", label: "Phone Number",  icon: Phone, type: "tel",   placeholder: "+250 78 000 0000",  value: profile.phone },
  ];

  const detailFields: EditableField[] = [
    { key: "location", label: "Location", icon: MapPin,   type: "text",     placeholder: "City, Country",               value: profile.location },
    { key: "bio",      label: "Bio",      icon: FileText, type: "text",     placeholder: "A short bio about yourself",  value: profile.bio },
  ];

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-[#fafafa] min-h-screen">
        <div className="max-w-6xl mx-auto px-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 mb-10">
            <Link href="/account" className="hover:text-zinc-600 transition-colors">Account</Link>
            <ChevronRight size={14} />
            <span className="text-zinc-900">Profile</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">

            {/* ─── LEFT: Profile Summary Card ─── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-36 space-y-4"
            >
              <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-lg shadow-zinc-100/60 p-8 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-6 group">
                  <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative">
                    <Image
                      src={user?.avatar ?? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-9 h-9 bg-primary rounded-2xl shadow-lg flex items-center justify-center text-white hover:bg-[#064e3b] transition-all hover:scale-110">
                    <Camera size={16} />
                  </button>
                </div>

                <h2 className="text-xl font-black text-zinc-900 mb-1 leading-tight">{profile.name}</h2>
                <p className="text-sm text-zinc-500 font-medium mb-1">{profile.email}</p>
                {profile.location && (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium mt-1">
                    <MapPin size={12} /> {profile.location}
                  </div>
                )}

                {/* Verified + Joined */}
                <div className="w-full mt-6 pt-6 border-t border-zinc-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400">Status</span>
                    <div className="flex items-center gap-1.5 text-xs font-black text-primary">
                      <BadgeCheck size={14} className="fill-primary/10" /> Verified
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400">Member since</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-600">
                      <CalendarDays size={13} /> April 2025
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400">Role</span>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full ${user?.role === "host" ? "bg-amber-50 text-amber-600" : "bg-primary/8 text-primary"}`}>
                      {user?.role === "host" ? "Host" : "Guest"}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 rounded-2xl border-2 border-dashed border-zinc-100 text-sm font-bold text-zinc-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                  <Camera size={16} /> Update Photo
                </button>
              </div>

              {/* Bio card (mobile/sidebar) */}
              {profile.bio && (
                <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-lg shadow-zinc-100/60 p-6">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">About</p>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">{profile.bio}</p>
                </div>
              )}
            </motion.div>

            {/* ─── RIGHT: Editable Sections ─── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Page header */}
              <div className="mb-2">
                <h1 className="text-3xl font-black text-zinc-900 mb-1">Personal Info</h1>
                <p className="text-zinc-500 font-medium text-sm">
                  Keep your personal information accurate and up to date.
                </p>
              </div>

              {/* Personal Details Section */}
              <SectionCard title="Personal Details">
                {personalFields.map((field) => (
                  <EditableRow
                    key={field.key}
                    field={field}
                    isEditing={!!editing[field.key]}
                    onEdit={() => startEdit(field.key)}
                    onSave={() => saveEdit(field.key)}
                    onCancel={() => cancelEdit(field.key)}
                    onChange={(v) => setDrafts((d) => ({ ...d, [field.key]: v }))}
                    draftValue={drafts[field.key] ?? field.value}
                    saved={!!saved[field.key]}
                  />
                ))}
              </SectionCard>

              {/* Basic Details Section */}
              <SectionCard title="Basic Details">
                {detailFields.map((field) => (
                  <EditableRow
                    key={field.key}
                    field={field}
                    isEditing={!!editing[field.key]}
                    onEdit={() => startEdit(field.key)}
                    onSave={() => saveEdit(field.key)}
                    onCancel={() => cancelEdit(field.key)}
                    onChange={(v) => setDrafts((d) => ({ ...d, [field.key]: v }))}
                    draftValue={drafts[field.key] ?? field.value}
                    saved={!!saved[field.key]}
                  />
                ))}
              </SectionCard>

              {/* Account Status Card */}
              <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-transparent rounded-[2rem] border border-primary/10 p-7 flex items-center gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <BadgeCheck size={26} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-zinc-800">Verified Account</h3>
                    <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-md">
                    Your account is verified and in good standing. You have full access to all StayWell features and can book or list properties.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
