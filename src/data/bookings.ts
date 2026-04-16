export interface Booking {
  id: string;
  propertyTitle: string;
  propertyImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  hostName: string;
  nightlyRate: number;
  nights: number;
  serviceFee: number;
  taxes: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending';
  bookingId: string;
  transactionId: string;
  paymentDate: string;
}

export const mockBookings: Record<string, Booking> = {
  "1": {
    id: "1",
    propertyTitle: "Serene Lakefront Villa",
    propertyImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    location: "Kibuye, Rwanda",
    checkIn: "Oct 12, 2025",
    checkOut: "Oct 15, 2025",
    guests: 2,
    status: 'Confirmed',
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    guestPhone: "+250 788 000 000",
    hostName: "Alice Kamanzi",
    nightlyRate: 150000,
    nights: 3,
    serviceFee: 15000,
    taxes: 26100,
    totalAmount: 491100,
    paymentMethod: "Visa ending in **** 1234",
    paymentStatus: 'Paid',
    bookingId: "SW-8829-1022",
    transactionId: "TXN-990-211-55",
    paymentDate: "Oct 10, 2025"
  },
  "2": {
    id: "2",
    propertyTitle: "Modern Kigali Penthouse",
    propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    location: "Kigali, Rwanda",
    checkIn: "Aug 05, 2024",
    checkOut: "Aug 10, 2024",
    guests: 4,
    status: 'Completed',
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    guestPhone: "+250 788 000 000",
    hostName: "David Mugisha",
    nightlyRate: 80000,
    nights: 5,
    serviceFee: 8000,
    taxes: 15840,
    totalAmount: 423840,
    paymentMethod: "Mobile Money (MTN)",
    paymentStatus: 'Paid',
    bookingId: "SW-4412-8871",
    transactionId: "TXN-112-554-99",
    paymentDate: "Aug 01, 2024"
  }
};
