import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { Room } from "~/lib/mock-data";
import { calculateNights, calculateTotalPrice } from "~/lib/mock-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Users, Moon, CreditCard } from "lucide-react";

export type ReservationSummaryProps = {
  room: Room;
  checkIn: Date;
  checkOut: Date;
  numberOfGuests: number;
};

export const ReservationSummary = ({
  room,
  checkIn,
  checkOut,
  numberOfGuests,
}: ReservationSummaryProps) => {
  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = calculateTotalPrice(room.pricePerNight, checkIn, checkOut);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Resumo da Reserva</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Room Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={room.images[0]}
            alt={room.name}
            className="h-48 w-full object-cover"
          />
        </div>

        {/* Room Name */}
        <div>
          <h3 className="text-xl font-semibold">{room.name}</h3>
          <p className="text-sm text-muted-foreground">Capacidade: até {room.capacity} hóspedes</p>
        </div>

        <div className="space-y-3 border-t pt-4">
          {/* Check-in/out */}
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-medium">Check-in</div>
              <div className="text-sm text-muted-foreground">{formatDate(checkIn)}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-medium">Check-out</div>
              <div className="text-sm text-muted-foreground">{formatDate(checkOut)}</div>
            </div>
          </div>

          {/* Number of nights */}
          <div className="flex items-start gap-3">
            <Moon className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-medium">
                {nights} {nights === 1 ? "noite" : "noites"}
              </div>
            </div>
          </div>

          {/* Number of guests */}
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-medium">
                {numberOfGuests} {numberOfGuests === 1 ? "hóspede" : "hóspedes"}
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span>
              {formatPrice(room.pricePerNight)} x {nights} {nights === 1 ? "noite" : "noites"}
            </span>
            <span>{formatPrice(room.pricePerNight * nights)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-lg font-semibold">Total</span>
          </div>
          <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

