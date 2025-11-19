import { addDays, format } from "date-fns";

export type Room = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
};

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Reservation = {
  id: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCPF: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: string;
};

// Mock de quartos disponíveis
export const mockRooms: Room[] = [
  {
    id: "quarto-1",
    name: "Suíte Master",
    description: "Quarto espaçoso com vista para o mar, cama king size e varanda privativa. Ideal para casais em lua de mel.",
    capacity: 2,
    pricePerNight: 450,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop",
    ],
    amenities: ["Wi-Fi", "Ar condicionado", "TV a cabo", "Frigobar", "Vista para o mar"],
  },
  {
    id: "quarto-2",
    name: "Quarto Standard",
    description: "Quarto confortável com cama de casal, perfeito para uma estadia tranquila.",
    capacity: 2,
    pricePerNight: 280,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop",
    ],
    amenities: ["Wi-Fi", "Ar condicionado", "TV", "Frigobar"],
  },
  {
    id: "quarto-3",
    name: "Quarto Família",
    description: "Amplo quarto familiar com duas camas de casal, ideal para famílias com crianças.",
    capacity: 4,
    pricePerNight: 550,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop",
    ],
    amenities: ["Wi-Fi", "Ar condicionado", "TV a cabo", "Frigobar", "Varanda", "Berço disponível"],
  },
  {
    id: "quarto-4",
    name: "Chalé Luxo",
    description: "Chalé independente com jacuzzi privativa, sala de estar e vista panorâmica.",
    capacity: 3,
    pricePerNight: 780,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
    ],
    amenities: ["Wi-Fi", "Ar condicionado", "TV Smart", "Frigobar", "Jacuzzi", "Vista panorâmica", "Sala de estar"],
  },
];

// Mock de reservas existentes
export const mockReservations: Reservation[] = [
  {
    id: "res-001",
    roomId: "quarto-1",
    roomName: "Suíte Master",
    guestName: "Maria Silva",
    guestEmail: "maria.silva@email.com",
    guestPhone: "(11) 99999-1111",
    guestCPF: "123.456.789-00",
    checkIn: format(addDays(new Date(), -5), "yyyy-MM-dd"),
    checkOut: format(addDays(new Date(), -2), "yyyy-MM-dd"),
    numberOfGuests: 2,
    totalPrice: 1350,
    status: "completed",
    createdAt: format(addDays(new Date(), -10), "yyyy-MM-dd'T'HH:mm:ss"),
  },
  {
    id: "res-002",
    roomId: "quarto-3",
    roomName: "Quarto Família",
    guestName: "João Santos",
    guestEmail: "joao.santos@email.com",
    guestPhone: "(21) 98888-2222",
    guestCPF: "987.654.321-00",
    checkIn: format(new Date(), "yyyy-MM-dd"),
    checkOut: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    numberOfGuests: 4,
    totalPrice: 1650,
    status: "confirmed",
    createdAt: format(addDays(new Date(), -7), "yyyy-MM-dd'T'HH:mm:ss"),
  },
  {
    id: "res-003",
    roomId: "quarto-4",
    roomName: "Chalé Luxo",
    guestName: "Ana Paula Costa",
    guestEmail: "ana.costa@email.com",
    guestPhone: "(31) 97777-3333",
    guestCPF: "456.789.123-00",
    checkIn: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    checkOut: format(addDays(new Date(), 10), "yyyy-MM-dd"),
    numberOfGuests: 2,
    totalPrice: 2340,
    status: "confirmed",
    createdAt: format(addDays(new Date(), -3), "yyyy-MM-dd'T'HH:mm:ss"),
  },
  {
    id: "res-004",
    roomId: "quarto-2",
    roomName: "Quarto Standard",
    guestName: "Carlos Oliveira",
    guestEmail: "carlos.oliveira@email.com",
    guestPhone: "(41) 96666-4444",
    guestCPF: "321.654.987-00",
    checkIn: format(addDays(new Date(), 14), "yyyy-MM-dd"),
    checkOut: format(addDays(new Date(), 17), "yyyy-MM-dd"),
    numberOfGuests: 2,
    totalPrice: 840,
    status: "pending",
    createdAt: format(addDays(new Date(), -1), "yyyy-MM-dd'T'HH:mm:ss"),
  },
];

// Utilitários para localStorage
const STORAGE_KEY = "pousada_reservations";

export const getStoredReservations = (): Reservation[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getAllReservations = (): Reservation[] => {
  const stored = getStoredReservations();
  return [...mockReservations, ...stored];
};

export const saveReservation = (reservation: Omit<Reservation, "id" | "createdAt">): Reservation => {
  const newReservation: Reservation = {
    ...reservation,
    id: `res-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  const stored = getStoredReservations();
  const updated = [...stored, newReservation];
  
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return newReservation;
};

export const getRoomById = (id: string): Room | undefined => {
  return mockRooms.find(room => room.id === id);
};

export const calculateTotalPrice = (pricePerNight: number, checkIn: Date, checkOut: Date): number => {
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  return pricePerNight * nights;
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
};

// Simular disponibilidade (sempre retorna disponível para MVP)
export const checkRoomAvailability = (
  roomId: string,
  checkIn: Date,
  checkOut: Date
): boolean => {
  // No MVP, sempre retorna true
  return true;
};

export const getAvailableRooms = (
  checkIn: Date,
  checkOut: Date,
  numberOfGuests: number
): Room[] => {
  // No MVP, filtra apenas por capacidade
  return mockRooms.filter(room => room.capacity >= numberOfGuests);
};

