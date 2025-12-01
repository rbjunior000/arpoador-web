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

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

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
    id: "suite-master-vista-mar",
    name: "Suíte Master com Vista Mar",
    description:
      "Experiência premium com vista panorâmica para o oceano. Quarto espaçoso com cama King Size, varanda privativa e decoração rústica-chique que harmoniza com a brisa do mar.",
    capacity: 2,
    pricePerNight: 650,
    images: [
      "/images/bungalows-kite-lagon/IMG_6208.PNG",
      "/images/bungalows-kite-lagon/IMG_6209.PNG",
      "/images/bungalows-kite-lagon/IMG_6210.PNG",
      "/images/bungalows-kite-lagon/IMG_6211.PNG",
    ],
    amenities: [
      "Vista para o Mar",
      "Ar Condicionado",
      "Wi-Fi Grátis",
      "Frigobar",
      "Varanda Privativa",
      "Café da Manhã Incluso",
    ],
  },
  {
    id: "chale-familia",
    name: "Chalé Família",
    description:
      "Perfeito para famílias, este chalé oferece conforto e espaço. Acomoda até 4 pessoas com uma cama de casal e duas de solteiro, além de um pátio privativo para momentos de lazer.",
    capacity: 4,
    pricePerNight: 550,
    images: [
      "/images/pousada/IMG_6203.PNG",
      "/images/pousada/IMG_6204.PNG",
      "/images/pousada/IMG_6205.PNG",
    ],
    amenities: [
      "Pátio Privativo",
      "Ar Condicionado",
      "Wi-Fi Grátis",
      "TV Smart",
      "Rede de Descanso",
      "Área de Estar",
    ],
  },
  {
    id: "bangalo-rustico",
    name: "Bangalô Rústico",
    description:
      "Charme e aconchego em meio à natureza. Bangalô construído com materiais locais, oferecendo uma autêntica experiência de praia com todo o conforto moderno.",
    capacity: 2,
    pricePerNight: 380,
    images: [
      "/images/pousada/IMG_6206.PNG",
      "/images/pousada/IMG_6207.PNG",
      "/images/areas-comuns/IMG_6216.PNG",
    ],
    amenities: [
      "Jardim Privativo",
      "Ventilador de Teto",
      "Wi-Fi Grátis",
      "Frigobar",
      "Mosquiteiro",
      "Varanda Térrea",
    ],
  },
  {
    id: "suite-standard",
    name: "Suíte Standard",
    description:
      "Conforto e praticidade para sua estadia. Quarto acolhedor com todas as comodidades essenciais para relaxar após um dia de praia em Tutóia.",
    capacity: 2,
    pricePerNight: 280,
    images: [
      "/images/bungalow-standard/IMG_6199.PNG",
      "/images/bungalow-standard/IMG_6200.PNG",
      "/images/bungalow-standard/IMG_6201.PNG",
      "/images/bungalow-standard/IMG_6202.PNG",
    ],
    amenities: [
      "Ar Condicionado",
      "Wi-Fi Grátis",
      "TV",
      "Chuveiro Elétrico",
      "Armário",
      "Mesa de Trabalho",
    ],
  },
];

// Mock de reservas existentes
export const mockReservations: Reservation[] = [
  {
    id: "res-001",
    roomId: "suite-master-vista-mar",
    roomName: "Suíte Master com Vista Mar",
    guestName: "Maria Silva",
    guestEmail: "maria.silva@email.com",
    guestPhone: "(11) 99999-1111",
    guestCPF: "123.456.789-00",
    checkIn: format(addDays(new Date(), -5), "yyyy-MM-dd"),
    checkOut: format(addDays(new Date(), -2), "yyyy-MM-dd"),
    numberOfGuests: 2,
    totalPrice: 1950,
    status: "completed",
    createdAt: format(addDays(new Date(), -10), "yyyy-MM-dd'T'HH:mm:ss"),
  },
  {
    id: "res-002",
    roomId: "chale-familia",
    roomName: "Chalé Família",
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
    roomId: "bangalo-rustico",
    roomName: "Bangalô Rústico",
    guestName: "Ana Paula Costa",
    guestEmail: "ana.costa@email.com",
    guestPhone: "(31) 97777-3333",
    guestCPF: "456.789.123-00",
    checkIn: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    checkOut: format(addDays(new Date(), 10), "yyyy-MM-dd"),
    numberOfGuests: 2,
    totalPrice: 1140,
    status: "confirmed",
    createdAt: format(addDays(new Date(), -3), "yyyy-MM-dd'T'HH:mm:ss"),
  },
  {
    id: "res-004",
    roomId: "suite-standard",
    roomName: "Suíte Standard",
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

export const saveReservation = (
  reservation: Omit<Reservation, "id" | "createdAt">
): Reservation => {
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
  return mockRooms.find((room) => room.id === id);
};

export const calculateTotalPrice = (
  pricePerNight: number,
  checkIn: Date,
  checkOut: Date
): number => {
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
  return pricePerNight * nights;
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  return Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
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
  return mockRooms.filter((room) => room.capacity >= numberOfGuests);
};
