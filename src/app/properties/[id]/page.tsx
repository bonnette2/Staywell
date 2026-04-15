import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyDetailsHero from "@/components/PropertyDetailsHero";
import PropertySpecs from "@/components/PropertySpecs";
import PropertySidebar from "@/components/PropertySidebar";
import PropertyCard from "@/components/PropertyCard";
import Preloader from "@/components/Preloader";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const properties = [
  {
    id: "luxury-villa-kigali-1",
    title: "Luxury Villa Kigali",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    price: "RWF 150,000",
    location: "Kigali, Rwanda",
    rating: 5,
    specs: { area: "2500", bedrooms: 3, bathrooms: 12, parking: 1 },
    category: "Villa"
  },
  {
    id: "luxury-villa-kigali-2",
    title: "Luxury Villa Kigali",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    price: "RWF 150,000",
    location: "Kigali, Rwanda",
    rating: 5,
    specs: { area: "2500", bedrooms: 3, bathrooms: 12, parking: 1 },
    category: "Villa"
  },
  {
    id: "luxury-villa-kigali-3",
    title: "Luxury Villa Kigali",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    price: "RWF 150,000",
    location: "Kigali, Rwanda",
    rating: 5,
    specs: { area: "2500", bedrooms: 3, bathrooms: 12, parking: 1 },
    category: "Villa"
  },
];

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // In a real app, you'd fetch property by ID. Using placeholder data for now.
  const propertyTitle = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <>
      <Preloader />
      <Header />
      <main className="bg-white min-h-screen">
        <PropertyDetailsHero title={propertyTitle} />
        
        {/* Breadcrumbs and Categories */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="px-6 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20">Apartment</span>
              <span className="px-6 py-2 rounded-full border border-zinc-200 text-xs font-bold text-zinc-600">For sale</span>
            </div>
            <div className="text-4xl md:text-5xl font-black tracking-tight text-[#171717]">$550,000</div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8">
              <PropertySpecs />
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="lg:col-span-4">
              <PropertySidebar />
            </div>
          </div>
        </section>

        {/* Similar Properties */}
        <section className="py-24 bg-[#fafafc] border-t border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-4xl font-bold tracking-tight">View other properties</h2>
              <Link href="/properties" className="group flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full text-sm font-bold shadow-xl transition-all hover:bg-[#064e3b] shadow-primary/20">
                View all properties <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
