"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  Plus,
  Lock,
  Shield,
  Star,
  Trash2,
  Pencil,
  Check,
  X,
  Phone,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

/* ─────────────── TYPES ─────────────── */
type PaymentType = "card" | "mobile";

interface PaymentMethod {
  id: string;
  type: PaymentType;
  brand?: "visa" | "mastercard";
  last4?: string;
  name?: string;
  expiry?: string;
  phone?: string;
  provider?: string;
  isDefault: boolean;
}

/* ─────────────── MOCK DATA ─────────────── */
const INITIAL_METHODS: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    brand: "visa",
    last4: "4242",
    name: "John Doe",
    expiry: "08/27",
    isDefault: true,
  },
  {
    id: "2",
    type: "mobile",
    provider: "MTN Mobile Money",
    phone: "+250 78*** ***8",
    isDefault: false,
  },
];

/* ─────────────── BRAND ICONS ─────────────── */
function VisaIcon() {
  return (
    <div className="flex items-center justify-center w-12 h-8 bg-[#1434CB] rounded-lg shadow-sm shrink-0">
      <span className="text-white text-sm font-black italic tracking-tighter">VISA</span>
    </div>
  );
}

function MastercardIcon() {
  return (
    <div className="flex items-center justify-center w-12 h-8 rounded-lg shadow-sm shrink-0 overflow-hidden bg-white border border-zinc-100">
      <div className="relative w-7 h-5">
        <div className="absolute left-0 top-0 w-4 h-5 bg-[#EB001B] rounded-full opacity-90" />
        <div className="absolute right-0 top-0 w-4 h-5 bg-[#F79E1B] rounded-full opacity-90" />
      </div>
    </div>
  );
}

function MobileMoneyIcon({ provider }: { provider?: string }) {
  const color = provider?.toLowerCase().includes("mtn") ? "#FFCC00" : "#E4002B";
  const initial = provider?.charAt(0) ?? "M";
  return (
    <div className="flex items-center justify-center w-12 h-8 rounded-lg shadow-sm shrink-0" style={{ background: color }}>
      <span className="text-xs font-black text-zinc-800">{initial}M</span>
    </div>
  );
}

/* ─────────────── PAYMENT CARD ─────────────── */
function PaymentCard({
  method,
  onSetDefault,
  onDelete,
}: {
  method: PaymentMethod;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`relative p-6 rounded-[2rem] border-2 bg-white transition-all ${
        method.isDefault
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-zinc-100 shadow-md shadow-zinc-100/60 hover:border-zinc-200"
      }`}
    >
      {/* Default badge */}
      {method.isDefault && (
        <div className="absolute -top-3 left-6 flex items-center gap-1.5 px-3 py-1 bg-primary rounded-full shadow-md">
          <Star size={11} className="text-white fill-white" />
          <span className="text-[10px] font-black text-white uppercase tracking-wider">Default</span>
        </div>
      )}

      <div className="flex items-center gap-4 mb-5">
        {/* Brand icon */}
        {method.type === "card" ? (
          method.brand === "visa" ? <VisaIcon /> : <MastercardIcon />
        ) : (
          <MobileMoneyIcon provider={method.provider} />
        )}

        {/* Details */}
        <div className="flex-1 min-w-0">
          {method.type === "card" ? (
            <>
              <p className="font-bold text-zinc-800 text-sm tracking-widest">
                •••• •••• •••• {method.last4}
              </p>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">{method.name}</p>
            </>
          ) : (
            <>
              <p className="font-bold text-zinc-800 text-sm">{method.provider}</p>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">{method.phone}</p>
            </>
          )}
        </div>

        {/* Expiry (cards only) */}
        {method.type === "card" && (
          <div className="text-right shrink-0">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Expires</p>
            <p className="text-sm font-bold text-zinc-700">{method.expiry}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-50">
        {!method.isDefault && (
          <button
            onClick={() => onSetDefault(method.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <Check size={13} /> Set as Default
          </button>
        )}
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 bg-zinc-50 hover:bg-zinc-100 transition-colors ml-auto">
          <Pencil size={13} /> Edit
        </button>
        <button
          onClick={() => onDelete(method.id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <Trash2 size={13} /> Remove
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────── EMPTY STATE ─────────────── */
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-24 border-2 border-dashed border-zinc-100 rounded-[3rem] bg-zinc-50/40"
    >
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-zinc-300 mx-auto mb-6 shadow-md">
        <CreditCard size={36} />
      </div>
      <h3 className="text-xl font-bold text-zinc-800 mb-2">No payment methods yet</h3>
      <p className="text-zinc-500 font-medium max-w-xs mx-auto text-sm mb-8 leading-relaxed">
        Add a payment method to make your bookings faster and more secure.
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-[#001a17] transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
      >
        <Plus size={18} /> Add Payment Method
      </button>
    </motion.div>
  );
}

/* ─────────────── DELETE CONFIRM MODAL ─────────────── */
function DeleteModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center px-4 py-8"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="relative bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl z-10"
      >
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
          <AlertTriangle size={28} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 text-center mb-2">Remove payment method?</h3>
        <p className="text-zinc-500 text-sm font-medium text-center mb-8 leading-relaxed">
          This payment method will be permanently removed from your account.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-2xl border-2 border-zinc-100 font-bold text-zinc-700 hover:bg-zinc-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 rounded-2xl bg-red-500 font-bold text-white hover:bg-red-600 transition-colors text-sm shadow-lg shadow-red-200"
          >
            Remove
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── ADD PAYMENT MODAL ─────────────── */
function AddPaymentModal({ onClose, onAdd }: { onClose: () => void; onAdd: (m: PaymentMethod) => void }) {
  const [tab, setTab] = useState<PaymentType>("card");
  const [saveDefault, setSaveDefault] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [mobile, setMobile] = useState({ phone: "", provider: "MTN Mobile Money" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "card") {
      const last4 = card.number.replace(/\s/g, "").slice(-4);
      const brand = card.number.startsWith("4") ? "visa" : "mastercard";
      onAdd({ id: Date.now().toString(), type: "card", brand, last4, name: card.name, expiry: card.expiry, isDefault: saveDefault });
    } else {
      onAdd({ id: Date.now().toString(), type: "mobile", provider: mobile.provider, phone: mobile.phone, isDefault: saveDefault });
    }
    onClose();
  };

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{1,2})/, "$1/$2");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center px-4 py-8"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="relative bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Add Payment Method</h2>
            <p className="text-xs text-zinc-500 font-medium mt-1">All details are encrypted and secure</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 p-1.5 bg-zinc-50 rounded-2xl mb-8">
          {([["card", "Credit / Debit Card"], ["mobile", "Mobile Money"]] as [PaymentType, string][]).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setTab(val)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === val
                  ? "bg-white text-zinc-900 shadow-md"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === "card" ? (
            <>
              <div>
                <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2.5">Card Number</label>
                <div className="relative">
                  <CreditCard size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    required
                    placeholder="1234 5678 9012 3456"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                    className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2.5">Cardholder Name</label>
                <input
                  required
                  placeholder="John Doe"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2.5">Expiry Date</label>
                  <input
                    required
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2.5">CVV</label>
                  <div className="relative">
                    <input
                      required
                      placeholder="•••"
                      type="password"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "") })}
                      className="w-full pl-5 pr-10 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                    <Lock size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2.5">Phone Number</label>
                <div className="relative">
                  <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    required
                    placeholder="+250 78 000 0000"
                    value={mobile.phone}
                    onChange={(e) => setMobile({ ...mobile, phone: e.target.value })}
                    className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2.5">Provider</label>
                <div className="relative">
                  <select
                    value={mobile.provider}
                    onChange={(e) => setMobile({ ...mobile, provider: e.target.value })}
                    className="w-full px-5 pr-10 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer"
                  >
                    <option>MTN Mobile Money</option>
                    <option>Airtel Money</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </>
          )}

          {/* Save as default */}
          <button
            type="button"
            onClick={() => setSaveDefault(!saveDefault)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-zinc-100 hover:border-zinc-200 transition-colors"
          >
            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${saveDefault ? "bg-primary border-primary" : "border-zinc-300"}`}>
              {saveDefault && <Check size={12} className="text-white" />}
            </div>
            <span className="text-sm font-bold text-zinc-700">Save as default payment method</span>
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-[#001a17] transition-all shadow-lg shadow-primary/20 hover:scale-[1.01]"
          >
            Save Payment Method
          </button>
        </form>

        {/* Security notice */}
        <div className="flex items-center gap-3 mt-6 p-4 bg-zinc-50 rounded-2xl">
          <Shield size={16} className="text-primary shrink-0" />
          <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
            Your payment details are encrypted using 256-bit SSL. StayWell never stores your full card number.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(INITIAL_METHODS);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (m: PaymentMethod) => {
    setMethods((prev) => {
      const updated = m.isDefault ? prev.map((p) => ({ ...p, isDefault: false })) : prev;
      return [...updated, m];
    });
  };

  const handleSetDefault = (id: string) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setMethods((prev) => {
      const remaining = prev.filter((m) => m.id !== deleteId);
      // If deleted was default, make first remaining default
      if (remaining.length > 0 && !remaining.some((m) => m.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
    setDeleteId(null);
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 mb-10">
            <Link href="/account" className="hover:text-zinc-600 transition-colors">Account</Link>
            <ChevronRight size={14} />
            <span className="text-zinc-900">Payment Methods</span>
          </div>

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-2">Payment Methods</h1>
              <p className="text-zinc-500 font-medium">
                Manage your payment options for faster and secure bookings
              </p>
            </div>
            {methods.length > 0 && (
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-bold hover:bg-[#001a17] transition-all shadow-lg shadow-primary/20 shrink-0 text-sm"
              >
                <Plus size={18} /> Add Method
              </button>
            )}
          </div>

          {/* Methods list or Empty state */}
          <AnimatePresence mode="popLayout">
            {methods.length === 0 ? (
              <EmptyState key="empty" onAdd={() => setShowAdd(true)} />
            ) : (
              <motion.div key="list" className="space-y-5">
                {methods.map((method) => (
                  <PaymentCard
                    key={method.id}
                    method={method}
                    onSetDefault={handleSetDefault}
                    onDelete={(id) => setDeleteId(id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Security Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex items-start gap-5 p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-[2rem] border border-zinc-100"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-primary">
              <Shield size={22} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-800 mb-1">Your information is protected</h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed max-w-xl">
                StayWell uses 256-bit SSL encryption for all payment transactions. We never store your full card details on our servers. Your financial data is always safe with us.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {showAdd && (
          <AddPaymentModal
            key="add"
            onClose={() => setShowAdd(false)}
            onAdd={handleAdd}
          />
        )}
        {deleteId && (
          <DeleteModal
            key="delete"
            onConfirm={handleDelete}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
