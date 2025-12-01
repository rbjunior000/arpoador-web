import { Link } from "react-router";
import { PublicLayout, RoomCard } from "~/components";
import { Button } from "@/components/ui";
import { mockRooms } from "~/lib/mock-data";
import { Calendar, MapPin, Star } from "lucide-react";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/areas-comuns/IMG_6213.PNG"
            alt="Pousada Arpoador - Área Comum"
            className="h-full w-full object-cover brightness-75"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
            Bem-vindo à Pousada Arpoador
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Sua experiência inesquecível à beira-mar começa aqui
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/reserva">
              <Button size="lg" className="text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Fazer Reserva
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Ver Localização
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Excelência em Hospedagem
              </h3>
              <p className="text-muted-foreground">
                Quartos confortáveis e bem equipados para sua estadia perfeita
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Localização Privilegiada
              </h3>
              <p className="text-muted-foreground">
                Pertinho das melhores praias e pontos turísticos
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Reserva Fácil</h3>
              <p className="text-muted-foreground">
                Sistema simples e rápido para garantir sua hospedagem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Nossos Quartos</h2>
            <p className="text-lg text-muted-foreground">
              Escolha a acomodação perfeita para sua estadia
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {mockRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onSelect={() => {
                  window.location.href = "/reserva";
                }}
                buttonText="Reservar Agora"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Pronto para sua próxima aventura?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Reserve agora e garanta as melhores tarifas
          </p>
          <Link to="/reserva">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Ver Disponibilidade
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
