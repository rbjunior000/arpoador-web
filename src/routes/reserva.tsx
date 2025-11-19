import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PublicLayout, RoomCard } from "~/components";
import { Button, Input, Label, Card, CardContent } from "@/components/ui";
import { getAvailableRooms, mockRooms } from "~/lib/mock-data";
import { format, addDays } from "date-fns";
import { Calendar, Users, Search } from "lucide-react";

export default function Reserva() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 3), "yyyy-MM-dd"));
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [hasSearched, setHasSearched] = useState(false);
  const [availableRooms, setAvailableRooms] = useState(mockRooms);

  const handleSearch = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      alert("A data de check-out deve ser posterior à data de check-in");
      return;
    }

    const rooms = getAvailableRooms(checkInDate, checkOutDate, numberOfGuests);
    setAvailableRooms(rooms);
    setHasSearched(true);
  };

  const handleSelectRoom = (roomId: string) => {
    // Passar dados via URL params
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      numberOfGuests: numberOfGuests.toString(),
    });
    navigate(`/reserva/${roomId}?${params.toString()}`);
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Faça sua Reserva</h1>
          <p className="text-lg text-muted-foreground">
            Selecione as datas e encontre o quarto perfeito para você
          </p>
        </div>

        {/* Search Filter Card */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check-in
                </Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  min={format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOut" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check-out
                </Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Hóspedes
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              {availableRooms.length > 0
                ? `${availableRooms.length} quarto${availableRooms.length > 1 ? "s" : ""} disponível${availableRooms.length > 1 ? "is" : ""}`
                : "Nenhum quarto disponível"}
            </h2>
            {availableRooms.length === 0 && (
              <p className="mt-2 text-muted-foreground">
                Tente ajustar suas datas ou número de hóspedes
              </p>
            )}
          </div>
        )}

        {/* Available Rooms Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {availableRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelect={() => handleSelectRoom(room.id)}
              buttonText="Reservar Este Quarto"
              showFullDescription={false}
            />
          ))}
        </div>

        {/* Empty State - Show all rooms initially */}
        {!hasSearched && availableRooms.length === 0 && (
          <div className="py-16 text-center">
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">Selecione suas datas</h3>
            <p className="mt-2 text-muted-foreground">
              Use o filtro acima para buscar quartos disponíveis
            </p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

