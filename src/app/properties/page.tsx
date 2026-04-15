"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertiesHero from "@/components/PropertiesHero";
import PropertiesFilters from "@/components/PropertiesFilters";
import PropertyCard from "@/components/PropertyCard";
import Preloader from "@/components/Preloader";

const properties = [
  {
    id: "luxury-villa-kigali-1",
    title: "Luxury Villa Kigali",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    price: "RWF 150,000",
    priceRaw: 150000,
    location: "Gasabo, Kigali, Rwanda",
    rating: 5,
    specs: { area: "2500", bedrooms: 3, bathrooms: 12, parking: 1 },
    category: "Villa"
  },
  {
    id: "modern-apartment-kigali",
    title: "Modern Sky Apartment",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    price: "RWF 80,000",
    priceRaw: 80000,
    location: "Kicukiro, Kigali, Rwanda",
    rating: 4,
    specs: { area: "1200", bedrooms: 2, bathrooms: 2, parking: 1 },
    category: "Apartments"
  },
  {
    id: "luxe-condo-kigali",
    title: "Premium Urban Condo",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    price: "RWF 550,000",
    priceRaw: 550000,
    location: "Nyarugenge, Kigali, Rwanda",
    rating: 5,
    specs: { area: "1800", bedrooms: 2, bathrooms: 2, parking: 2 },
    category: "Condos"
  },
  {
    id: "secluded-resort-kigali",
    title: "Lakeview Private Resort",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    price: "RWF 750,000",
    priceRaw: 750000,
    location: "Rubavu, Western Province, Rwanda",
    rating: 5,
    specs: { area: "5000", bedrooms: 5, bathrooms: 6, parking: 4 },
    category: "Resort"
  },
  {
    id: "family-villa-remix",
    title: "The Oasis Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    price: "RWF 200,000",
    priceRaw: 200000,
    location: "Musanze, Northern Province, Rwanda",
    rating: 5,
    specs: { area: "3200", bedrooms: 4, bathrooms: 4, parking: 2 },
    category: "Villa"
  },
  {
    id: "boutique-hotel-kigali",
    title: "Boutique Hotel Room",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069&auto=format&fit=crop",
    price: "RWF 45,000",
    priceRaw: 45000,
    location: "Huye, Southern Province, Rwanda",
    rating: 5,
    specs: { area: "600", bedrooms: 1, bathrooms: 1, parking: 1 },
    category: "Hotel Room"
  },
];

export default function PropertiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const [activePrice, setActivePrice] = useState("all");

  const filteredProperties = properties.filter((p) => {
    // Category filter
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    
    // Location filter
    const matchesLocation = activeLocation === "All Locations" || p.location.includes(activeLocation);
    
    // Price filter
    let matchesPrice = true;
    if (activePrice === "low") matchesPrice = p.priceRaw < 100000;
    else if (activePrice === "medium") matchesPrice = p.priceRaw >= 100000 && p.priceRaw <= 500000;
    else if (activePrice === "high") matchesPrice = p.priceRaw > 500000;

    return matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <>
      <Preloader />
      <Header />
      <main className="bg-[#fafafc] min-h-screen">
        <PropertiesHero />
        <PropertiesFilters 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          activeLocation={activeLocation}
          onLocationChange={setActiveLocation}
          activePrice={activePrice}
          onPriceChange={setActivePrice}
        />
        
        <section className="py-24 max-w-7xl mx-auto px-6 min-h-[60vh]">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-bold text-zinc-800">No properties found</h3>
              <p className="text-zinc-500 mt-2">Try selecting another category.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
