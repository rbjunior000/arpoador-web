import { useState } from "react";
import { Layout, RoomCard, Badge } from "~/components";
import { mockRooms, getAllReservations } from "~/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Label, Input } from "@/components/ui";
import { Hotel, DollarSign, Users, TrendingUp, Plus, Eye } from "lucide-react";
import { format, isWithinInterval, parseISO } from "date-fns";

export default function AdminQuartos() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const allReservations = getAllReservations();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // Calcular estatísticas de ocupação
  const getRoomStats = (roomId: string) => {
    const roomReservations = allReservations.filter(
      (res) => res.roomId === roomId && res.status !== "cancelled"
    );

    const today = new Date();
    const currentReservation = roomReservations.find((res) => {
      try {
        const checkIn = parseISO(res.checkIn);
        const checkOut = parseISO(res.checkOut);
        return isWithinInterval(today, { start: checkIn, end: checkOut });
      } catch {
        return false;
      }
    });

    const futureReservations = roomReservations.filter((res) => {
      try {
        const checkIn = parseISO(res.checkIn);
        return checkIn > today;
      } catch {
        return false;
      }
    });

    const totalRevenue = roomReservations.reduce((sum, res) => sum + res.totalPrice, 0);

    return {
      isOccupied: !!currentReservation,
      currentGuest: currentReservation?.guestName,
      totalReservations: roomReservations.length,
      futureReservations: futureReservations.length,
      totalRevenue,
    };
  };

  const selectedRoomData = selectedRoom ? mockRooms.find(r => r.id === selectedRoom) : null;
  const selectedRoomStats = selectedRoom ? getRoomStats(selectedRoom) : null;

  // Estatísticas gerais
  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter(room => getRoomStats(room.id).isOccupied).length;
  const totalRevenue = mockRooms.reduce((sum, room) => sum + getRoomStats(room.id).totalRevenue, 0);
  const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Quartos</h1>
            <p className="text-muted-foreground">
              Gerencie os quartos da pousada
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Quarto
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Quartos</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRooms}</div>
              <p className="text-xs text-muted-foreground">
                {occupiedRooms} ocupados agora
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                Ocupação atual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                De todas as reservas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockRooms.reduce((sum, room) => sum + room.capacity, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Hóspedes simultâneos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rooms Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockRooms.map((room) => {
            const stats = getRoomStats(room.id);
            return (
              <Card key={room.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                  {stats.isOccupied && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Ocupado
                    </Badge>
                  )}
                  {!stats.isOccupied && stats.futureReservations > 0 && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      Disponível
                    </Badge>
                  )}
                  {!stats.isOccupied && stats.futureReservations === 0 && (
                    <Badge className="absolute top-2 right-2 bg-gray-500">
                      Livre
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{room.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Capacidade: {room.capacity} {room.capacity === 1 ? "pessoa" : "pessoas"}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(room.pricePerNight)}
                      </div>
                      <div className="text-xs text-muted-foreground">por noite</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stats.isOccupied && stats.currentGuest && (
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-xs font-medium text-muted-foreground">
                        Hóspede Atual
                      </div>
                      <div className="mt-1 font-medium">{stats.currentGuest}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-lg bg-muted p-2">
                      <div className="font-bold">{stats.totalReservations}</div>
                      <div className="text-xs text-muted-foreground">Reservas</div>
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <div className="font-bold">{stats.futureReservations}</div>
                      <div className="text-xs text-muted-foreground">Futuras</div>
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <div className="font-bold text-xs">{formatPrice(stats.totalRevenue)}</div>
                      <div className="text-xs text-muted-foreground">Receita</div>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedRoom(room.id);
                      setShowDetails(true);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Room Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRoomData && selectedRoomStats && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedRoomData.name}</DialogTitle>
                <DialogDescription>Informações completas do quarto</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Images Gallery */}
                <div className="grid grid-cols-2 gap-2">
                  {selectedRoomData.images.map((image, idx) => (
                    <div key={idx} className="aspect-video overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${selectedRoomData.name} - ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Info Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Preço por Noite</Label>
                    <Input value={formatPrice(selectedRoomData.pricePerNight)} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacidade</Label>
                    <Input value={`${selectedRoomData.capacity} hóspedes`} disabled />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <div className="rounded-md border bg-muted/50 p-3 text-sm">
                    {selectedRoomData.description}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                  <Label>Comodidades</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoomData.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-2">
                  <Label>Estatísticas</Label>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedRoomStats.totalReservations}</div>
                          <div className="text-xs text-muted-foreground">Total de Reservas</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedRoomStats.futureReservations}</div>
                          <div className="text-xs text-muted-foreground">Reservas Futuras</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{formatPrice(selectedRoomStats.totalRevenue)}</div>
                          <div className="text-xs text-muted-foreground">Receita Total</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Status */}
                {selectedRoomStats.isOccupied && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                    <div className="font-semibold">Quarto Ocupado</div>
                    <div className="mt-1 text-sm">
                      Hóspede atual: <span className="font-medium">{selectedRoomStats.currentGuest}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

