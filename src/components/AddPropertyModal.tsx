"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyToEdit?: any;
  onSave?: (property: any) => void;
}

const TABS = ["Basic Information", "Media", "Amenities", "Payment & Pricing"];
const AMENITIES = [
  "WIFI", "WIFI", "WIFI", 
  "WIFI", "WIFI", "WIFI", 
  "WIFI", "WIFI", "WIFI",
  "WIFI", "WIFI", "WIFI"
];

export default function AddPropertyModal({ isOpen, onClose, propertyToEdit, onSave }: AddPropertyModalProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "", type: "", guests: "", location: "", area: "", bedrooms: "", bathrooms: "", price: "", cleaningFee: ""
  });

  useEffect(() => {
    if (isOpen) {
      if (propertyToEdit) {
        setFormData({
          title: propertyToEdit.title || "",
          type: propertyToEdit.type?.toLowerCase() || "",
          guests: propertyToEdit.guests || "",
          location: propertyToEdit.location || "",
          area: propertyToEdit.area ? propertyToEdit.area.replace(/\D/g, '') : "",
          bedrooms: propertyToEdit.bedrooms || "",
          bathrooms: propertyToEdit.bathrooms || "",
          price: propertyToEdit.price ? String(propertyToEdit.price).replace(/,/g, '') : "",
          cleaningFee: propertyToEdit.cleaningFee || ""
        });
        if (propertyToEdit.image) {
          setImagePreviews([propertyToEdit.image]);
          setImages([]);
          setCoverImageIndex(0);
        } else {
          setImagePreviews([]);
        }
      } else {
        setFormData({ title: "", type: "", guests: "", location: "", area: "", bedrooms: "", bathrooms: "", price: "", cleaningFee: "" });
        setImagePreviews([]);
        setImages([]);
        setCoverImageIndex(0);
        setSelectedPayments([]);
        setActiveTab(TABS[0]);
      }
    }
  }, [isOpen, propertyToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray]);
      const previews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (coverImageIndex === index) {
      setCoverImageIndex(0);
    } else if (coverImageIndex > index) {
      setCoverImageIndex(prev => prev - 1);
    }
  };

  const togglePayment = (method: string) => {
    if (selectedPayments.includes(method)) setSelectedPayments(prev => prev.filter(m => m !== method));
    else setSelectedPayments(prev => [...prev, method]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#002521] px-8 py-5 flex items-center justify-between shrink-0">
            <h2 className="text-white text-lg font-bold tracking-tight">Add a Property</h2>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 pb-6 relative">
            {/* Tabs */}
            <div className="flex items-center gap-12 border-b border-zinc-100 mb-8 pb-4 relative px-4">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold transition-colors relative pb-4 -mb-[17px] ${
                    activeTab === tab ? "text-[#002521]" : "text-zinc-900"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#002521]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="min-h-[300px]">
              {activeTab === "Basic Information" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 px-4">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-2">Property Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="e.g Luxury Villa with pool" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Property Type</label>
                      <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521] bg-white appearance-none">
                        <option value="">Select type</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Guest Capacity</label>
                      <input name="guests" value={formData.guests} onChange={handleChange} type="number" min="1" placeholder="e.g 4" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Location</label>
                      <input name="location" value={formData.location} onChange={handleChange} type="text" placeholder="e.g Kigali, Rwanda" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Area (sqt / Ares)</label>
                      <input name="area" value={formData.area} onChange={handleChange} type="number" min="1" placeholder="e.g 2500" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Bedrooms</label>
                      <input name="bedrooms" value={formData.bedrooms} onChange={handleChange} type="number" min="1" placeholder="e.g 3" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Bathrooms</label>
                      <input name="bathrooms" value={formData.bathrooms} onChange={handleChange} type="number" min="1" placeholder="e.g 2" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Media" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4">
                  <h3 className="text-sm font-bold text-zinc-900 mb-6">Upload at least (3) pictures</h3>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-zinc-300 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 transition-colors"
                  >
                    <input 
                      type="file" 
                      multiple 
                      accept="image/png, image/jpeg" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                    />
                    <Upload size={24} className="mb-4 text-zinc-900" />
                    <p className="text-sm font-bold text-zinc-900 mb-1">Upload pictures</p>
                    <p className="text-xs font-bold text-zinc-500 mb-6">Supported formats: Jpg, PNG (Max 10MB)</p>
                    <button className="bg-[#002521] text-white px-10 py-2.5 rounded-lg text-sm font-bold transition-all hover:bg-[#00221c] pointer-events-none">
                      Select Files
                    </button>
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="mt-6 grid grid-cols-4 gap-4">
                      {imagePreviews.map((src, i) => (
                        <div 
                          key={i} 
                          onClick={() => setCoverImageIndex(i)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer group transition-all ${coverImageIndex === i ? 'border-[#002521] ring-2 ring-[#002521]/20' : 'border-zinc-200'}`}
                        >
                          <Image src={src} alt="preview" fill className="object-cover" />
                          {coverImageIndex === i && (
                            <div className="absolute top-2 left-2 bg-[#002521] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                              Cover
                            </div>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(i);
                            }}
                            className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "Amenities" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4">
                  <h3 className="text-sm font-bold text-zinc-900 mb-6">Select all amenities found at your property</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {AMENITIES.map((amenity, i) => (
                      <label key={i} className="flex items-center gap-3 border border-zinc-300 rounded-lg p-3 cursor-pointer hover:border-[#002521] transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#002521] focus:ring-[#002521]" />
                        <span className="text-sm font-bold text-zinc-900">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "Payment & Pricing" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 mb-6">Payment Methods</h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12 max-w-xl">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePayment('paypal')}>
                         <div className="flex items-center gap-3">
                           <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">P</div>
                           <span className="text-sm font-semibold text-zinc-900">Paypal</span>
                         </div>
                         <input type="checkbox" checked={selectedPayments.includes('paypal')} readOnly className="w-5 h-5 rounded border-zinc-300 text-[#002521] focus:ring-[#002521]" />
                      </div>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePayment('apple')}>
                         <div className="flex items-center gap-3">
                           <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">A</div>
                           <span className="text-sm font-semibold text-zinc-900">Apple pay</span>
                         </div>
                         <input type="checkbox" checked={selectedPayments.includes('apple')} readOnly className="w-5 h-5 rounded border-zinc-300 text-[#002521] focus:ring-[#002521]" />
                      </div>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePayment('card')}>
                         <div className="flex items-center gap-3">
                           <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold bg-gradient-to-r from-red-500 to-orange-400">C</div>
                           <span className="text-sm font-semibold text-zinc-900">Credit card</span>
                         </div>
                         <input type="checkbox" checked={selectedPayments.includes('card')} readOnly className="w-5 h-5 rounded border-zinc-300 text-[#002521] focus:ring-[#002521]" />
                      </div>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePayment('momo')}>
                         <div className="flex items-center gap-3">
                           <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">M</div>
                           <span className="text-sm font-semibold text-zinc-900">Mobile Money</span>
                         </div>
                         <input type="checkbox" checked={selectedPayments.includes('momo')} readOnly className="w-5 h-5 rounded border-zinc-300 text-[#002521] focus:ring-[#002521]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 mb-6">Pricing</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-2">Price per Night</label>
                        <input name="price" value={formData.price} onChange={handleChange} type="number" min="0" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" placeholder="e.g 150000" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-2">Cleaning Fee</label>
                        <input name="cleaningFee" value={formData.cleaningFee} onChange={handleChange} type="number" min="0" placeholder="e.g 5000" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#002521]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-4 pb-4">
              <button 
                onClick={onClose}
                className="px-10 py-2.5 rounded-lg text-sm font-bold text-zinc-900 border border-zinc-200 hover:bg-zinc-50 transition-colors"
              >
                cancel
              </button>
              <button 
                className="px-10 py-2.5 rounded-lg text-sm font-bold text-white bg-[#002521] hover:bg-[#00221c] transition-colors"
                onClick={() => {
                  if (activeTab === "Payment & Pricing") {
                    if (onSave) {
                      onSave({
                        ...propertyToEdit,
                        ...formData,
                        type: formData.type ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1) : "Villa",
                        area: formData.area ? `${formData.area} Ares` : "0 Ares",
                        image: imagePreviews[coverImageIndex] || propertyToEdit?.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                      });
                    }
                    onClose();
                  } else {
                    const nextIndex = TABS.indexOf(activeTab) + 1;
                    setActiveTab(TABS[nextIndex]);
                  }
                }}
              >
                {activeTab === "Payment & Pricing" ? (propertyToEdit ? "Save Changes" : "Add Property") : "Proceed"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
