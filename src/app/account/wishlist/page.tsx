"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";

export default function WishlistPage() {
  const wishlist = [];

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 mb-8">
            <Link href="/account" className="hover:text-zinc-600">Account</Link>
            <ChevronRight size={14} />
            <span className="text-zinc-900">Wishlist</span>
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 mb-12">Wishlist</h1>

          {wishlist.length === 0 ? (
            <div className="text-center py-32 border-2 border-dashed border-zinc-100 rounded-[3rem] bg-zinc-50/30">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-zinc-300 mx-auto mb-6 shadow-sm">
                <Heart size={32} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-800 mb-2">Create your first wishlist</h2>
              <p className="text-zinc-500 font-medium mb-8">As you search, click the heart icon to save your favorite homes.</p>
              <Link href="/properties" className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
                Explore Properties
              </Link>
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {/* Grid would go here */}
             </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
