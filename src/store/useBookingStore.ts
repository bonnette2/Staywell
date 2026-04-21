import { create } from 'zustand';

export interface Booking {
  id: number;
  guest: string;
  property: string;
  arrival: string;
  departure: string;
  status: 'Confirmed' | 'Rejected' | 'In Progress' | 'Completed' | 'Cancelled';
}

interface BookingStore {
  bookings: Booking[];
  updateBookingStatus: (id: number, status: Booking['status']) => void;
  setBookings: (bookings: Booking[]) => void;
}

const initialBookings: Booking[] = [
  { id: 1, guest: "Sarah Johnson", property: "Luxury Villa Kigali", arrival: "2025-07-12", departure: "2025-07-15", status: "Confirmed" },
  { id: 2, guest: "Michael Jen", property: "Modern Apt Gisenyi", arrival: "2025-07-13", departure: "2025-07-18", status: "In Progress" },
  { id: 3, guest: "Emma Wilson", property: "Lakeview Cottage", arrival: "2025-07-14", departure: "2025-07-16", status: "Confirmed" },
  { id: 4, guest: "David Brown", property: "City Center Loft", arrival: "2025-07-15", departure: "2025-07-20", status: "Cancelled" },
  { id: 5, guest: "Lisa Anderson", property: "Mountain Retreat", arrival: "2025-07-16", departure: "2025-07-22", status: "Confirmed" },
  { id: 6, guest: "James Miller", property: "Safari Lodge", arrival: "2025-07-17", departure: "2025-07-19", status: "Rejected" },
  { id: 7, guest: "Sarah Johnson", property: "Safari Lodge", arrival: "2025-07-12", departure: "2025-07-15", status: "Confirmed" },
  { id: 8, guest: "Michael Jen", property: "Safari Lodge", arrival: "2025-07-12", departure: "2025-07-15", status: "In Progress" },
];

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: initialBookings,
  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map((booking) => 
      booking.id === id ? { ...booking, status } : booking
    )
  })),
  setBookings: (bookings) => set({ bookings }),
}));
