import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui";
import type { Room } from "~/lib/mock-data";
import { Users, Wifi, Wind, Tv } from "lucide-react";

export type RoomCardProps = {
  room: Room;
  onSelect?: () => void;
  buttonText?: string;
  showFullDescription?: boolean;
};

export const RoomCard = ({ room, onSelect, buttonText = "Ver Detalhes", showFullDescription = false }: RoomCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4" />
                <span>Até {room.capacity} hóspedes</span>
              </div>
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{formatPrice(room.pricePerNight)}</div>
            <div className="text-xs text-muted-foreground">por noite</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm text-muted-foreground ${!showFullDescription && "line-clamp-2"}`}>
          {room.description}
        </p>
        {room.amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
              >
                {amenity === "Wi-Fi" && <Wifi className="h-3 w-3" />}
                {amenity === "Ar condicionado" && <Wind className="h-3 w-3" />}
                {(amenity.includes("TV") || amenity === "TV") && <Tv className="h-3 w-3" />}
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                +{room.amenities.length - 3} mais
              </span>
            )}
          </div>
        )}
      </CardContent>
      {onSelect && (
        <CardFooter>
          <Button onClick={onSelect} className="w-full" size="lg">
            {buttonText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

