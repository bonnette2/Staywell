"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Bell,
  MapPin,
  Star,
  ChevronDown,
  LayoutGrid,
  List,
  Edit,
  Trash2,
  Eye,
  CheckSquare,
  Square
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AddPropertyModal from "@/components/AddPropertyModal";

const initialProperties = [
    {
      id: 1,
      title: "Luxury Villa Kigali",
      location: "Kigali, Rwanda",
      rating: 4.8,
      area: "2500 Ares",
      guests: 6,
      bookings: 15,
      bedrooms: 4,
      bathrooms: 3,
      status: "Available",
      type: "Villa",
      price: "150,000",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Serengeti Villa",
      location: "Kigali, Rwanda",
      rating: 4.9,
      area: "3000 Ares",
      guests: 8,
      bookings: 5,
      bedrooms: 5,
      bathrooms: 4,
      status: "Booked",
      type: "Villa",
      price: "250,000",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Modern Apartment",
      location: "Nyarutarama, Kigali",
      rating: 4.5,
      area: "1200 Ares",
      guests: 2,
      bookings: 30,
      bedrooms: 1,
      bathrooms: 1,
      status: "Available",
      type: "Apartment",
      price: "50,000",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Cozy Family Home",
      location: "Kicukiro, Kigali",
      rating: 4.2,
      area: "1800 Ares",
      guests: 4,
      bookings: 10,
      bedrooms: 3,
      bathrooms: 2,
      status: "Pending",
      type: "House",
      price: "150,000",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
    }
  ];

export default function PropertiesDashboardPage() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/dashboard/properties", icon: Home, active: true },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
  
  const [activeProperties, setActiveProperties] = useState(initialProperties);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [propertyToEdit, setPropertyToEdit] = useState<any>(null);

  const filteredProperties = activeProperties.filter((p) => {
    const statusMatch = filterStatus === "All" || p.status === filterStatus;
    const typeMatch = filterType === "All" || p.type === filterType;
    return statusMatch && typeMatch;
  });

  return (
    <div className="flex min-h-screen bg-zinc-50/50 text-zinc-900 font-sans">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Properties Content */}
        <main className="p-8 lg:p-10 flex-1">
          {/* Header Block */}
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-[28px] font-extrabold text-zinc-900 leading-tight tracking-tight">My properties</h1>
                <p className="text-zinc-500 text-sm font-semibold mt-1">Manage you real estate properties using staywell</p>
              </div>
              <button 
                onClick={() => {
                  setPropertyToEdit(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 bg-white border border-[#013A37] px-4 py-2 rounded-lg text-sm font-bold text-[#013A37] shadow-sm hover:bg-zinc-50 transition-colors"
              >
                <span className="text-lg leading-none mb-0.5">+</span> Add property
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full max-w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-white border border-zinc-200 rounded-lg py-2 pl-10 pr-4 text-sm font-medium outline-none focus:ring-1 focus:ring-[#003129]/10"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-[140px]">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-white border border-zinc-200 px-4 py-2 rounded-lg text-sm font-semibold text-zinc-700 appearance-none outline-none focus:ring-1 focus:ring-[#003129]/30 cursor-pointer"
                >
                  <option value="All">All status</option>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Pending">Pending</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
              <div className="relative w-[140px]">
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-white border border-zinc-200 px-4 py-2 rounded-lg text-sm font-semibold text-zinc-700 appearance-none outline-none focus:ring-1 focus:ring-[#003129]/30 cursor-pointer"
                >
                  <option value="All">All types</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
              <div className="relative w-[140px]">
                <select className="w-full bg-white border border-zinc-200 px-4 py-2 rounded-lg text-sm font-semibold text-zinc-700 appearance-none outline-none focus:ring-1 focus:ring-[#003129]/30 cursor-pointer">
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
              
              <div className="flex items-center gap-1 ml-2 bg-zinc-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* Properties Content Area */}
          {selectedProperties.length > 0 && viewMode === "list" && (
            <div className="mb-4 bg-[#003129]/5 border border-[#003129]/20 p-4 rounded-xl flex items-center justify-between">
              <span className="text-sm font-bold text-[#003129]">{selectedProperties.length} items selected</span>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-700 hover:bg-zinc-50">Change Status</button>
                <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100">Delete Selected</button>
              </div>
            </div>
          )}

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col group relative">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={property.image} 
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900">{property.title}</h3>
                        <div className="flex items-center gap-1 text-zinc-500 mt-1">
                          <MapPin size={12} />
                          <span className="text-[11px] font-semibold">{property.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[12px] font-bold text-zinc-900">{property.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 text-zinc-400 border border-current rounded-[3px]"></div>
                        <span className="text-[11px] font-semibold text-zinc-700">{property.area} Area</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-zinc-400" />
                        <span className="text-[11px] font-semibold text-zinc-700">{property.guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-zinc-400/50 rounded flex items-center justify-center">
                          <span className="text-[8px] font-bold">B</span>
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-700">{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-zinc-400/50 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full border border-zinc-400"></div>
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-700">{property.bathrooms} Baths</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-5 border-t border-zinc-100 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#003129] font-black text-[13px] tracking-tight">RWF {property.price}</p>
                          <p className="text-[10px] font-bold text-zinc-400">Per night</p>
                        </div>
                         <div className={`px-2 py-1 rounded text-[10px] font-bold ${
                           property.status === 'Available' ? 'bg-emerald-50 text-emerald-600' :
                           property.status === 'Booked' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                         }`}>
                           {property.status}
                         </div>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-zinc-50">
                        <Link href={`/properties/${property.id}`} className="flex-1 py-1.5 flex justify-center items-center gap-1.5 bg-zinc-50 rounded text-[11px] font-bold text-zinc-700 hover:bg-zinc-100 transition-colors">
                          <Eye size={12} /> View
                        </Link>
                        <button onClick={() => { setPropertyToEdit(property); setIsModalOpen(true); }} className="flex-1 py-1.5 flex justify-center items-center gap-1.5 bg-[#013A37]/5 text-[#013A37] rounded text-[11px] font-bold hover:bg-[#013A37]/10 transition-colors">
                          <Edit size={12} /> Edit
                        </button>
                        <button onClick={() => setItemToDelete(property.id)} className="flex-1 py-1.5 flex justify-center items-center gap-1.5 bg-red-50 text-red-600 rounded text-[11px] font-bold hover:bg-red-100 transition-colors">
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200">
                      <th className="p-4 w-12">
                        <button 
                          onClick={() => {
                          if (selectedProperties.length === filteredProperties.length) setSelectedProperties([]);
                            else setSelectedProperties(filteredProperties.map(p => p.id));
                          }}
                          className="text-zinc-400 hover:text-[#003129] transition-colors"
                        >
                          {selectedProperties.length === filteredProperties.length && filteredProperties.length > 0 ? <CheckSquare size={18} className="text-[#003129]"/> : <Square size={18}/>}
                        </button>
                      </th>
                      <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Property</th>
                      <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Pricing</th>
                      <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Specs</th>
                      <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                      <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredProperties.map((property) => (
                      <tr key={property.id} className={`hover:bg-zinc-50/50 transition-colors ${selectedProperties.includes(property.id) ? 'bg-[#003129]/5 hover:bg-[#003129]/10' : ''}`}>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              if (selectedProperties.includes(property.id)) {
                                setSelectedProperties(prev => prev.filter(id => id !== property.id));
                              } else {
                                setSelectedProperties(prev => [...prev, property.id]);
                              }
                            }}
                            className="text-zinc-400 hover:text-[#003129] transition-colors"
                          >
                            {selectedProperties.includes(property.id) ? <CheckSquare size={18} className="text-[#003129]"/> : <Square size={18}/>}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0">
                               <Image src={property.image} alt={property.title} fill className="object-cover" />
                            </div>
                            <div>
                               <p className="font-bold text-zinc-900 text-sm whitespace-nowrap">{property.title}</p>
                               <span className="text-[11px] text-zinc-500 font-semibold">{property.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <p className="text-sm font-black text-[#003129]">RWF {property.price}</p>
                          <p className="text-[10px] font-bold text-zinc-400">/ night</p>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <p className="text-xs font-semibold text-zinc-600">{property.bedrooms} Beds, {property.bathrooms} Baths, {property.guests} Guests</p>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                           <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                             property.status === 'Available' ? 'bg-emerald-50 text-emerald-600' :
                             property.status === 'Booked' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                           }`}>
                             {property.status}
                           </span>
                        </td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex flex-row gap-2 justify-end">
                            <button 
                              onClick={() => {
                                setPropertyToEdit(property);
                                setIsModalOpen(true);
                              }}
                              className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-600 hover:bg-[#013A37] hover:text-white transition-all"
                            >
                              <Edit size={14} />
                            </button>
                            <Link href={`/properties/${property.id}`} className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-50 transition-all">
                              <Eye size={14} />
                            </Link>
                            <button 
                              onClick={() => setItemToDelete(property.id)}
                              className="p-2 bg-white border border-red-100 rounded-lg text-red-500 hover:bg-red-600 hover:text-white transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-between pb-8">
            <p className="text-sm font-semibold text-zinc-700">Showing 1 to 4 of 247 results</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-zinc-200 rounded text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">Previous</button>
              <button className="w-8 h-[30px] rounded bg-[#003129] text-white text-sm font-bold flex items-center justify-center">1</button>
              <button className="w-8 h-[30px] rounded border border-zinc-200 text-zinc-600 text-sm font-bold flex items-center justify-center hover:bg-zinc-50 transition-colors">2</button>
              <button className="px-4 py-1.5 border border-zinc-200 rounded text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">Next</button>
            </div>
          </div>
        </main>
      </div>

      <AddPropertyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        propertyToEdit={propertyToEdit}
        onSave={(data) => {
          if (propertyToEdit) {
            setActiveProperties(prev => prev.map(p => p.id === propertyToEdit.id ? { ...p, ...data } : p));
          } else {
            setActiveProperties(prev => [{ ...data, id: Date.now() }, ...prev]);
          }
        }}
      />

      {/* Delete Confirmation Modal */}
      {itemToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 size={24} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center text-zinc-900 mb-2">Delete Property</h3>
            <p className="text-sm text-center text-zinc-500 mb-6 w-[80%] mx-auto">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-3 text-sm font-bold text-zinc-700 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setActiveProperties(prev => prev.filter(p => p.id !== itemToDelete));
                  setItemToDelete(null);
                }}
                className="flex-1 py-3 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
