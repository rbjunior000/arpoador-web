import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router";
import { PublicLayout, ReservationSummary, StripeCheckout } from "~/components";
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getRoomById, saveReservation, calculateTotalPrice } from "~/lib/mock-data";
import { ArrowLeft, CreditCard, User, Mail, Phone, FileText } from "lucide-react";
import { format } from "date-fns";

export default function ReservaCheckout() {
  const { quartoId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(getRoomById(quartoId || ""));
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState(2);

  // Form fields
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCPF, setGuestCPF] = useState("");

  // Stripe modal
  const [showStripeModal, setShowStripeModal] = useState(false);

  useEffect(() => {
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");
    const guestsParam = searchParams.get("numberOfGuests");

    if (checkInParam) setCheckIn(new Date(checkInParam));
    if (checkOutParam) setCheckOut(new Date(checkOutParam));
    if (guestsParam) setNumberOfGuests(parseInt(guestsParam));
  }, [searchParams]);

  if (!room || !checkIn || !checkOut) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold">Quarto não encontrado</h1>
          <p className="mb-8 text-muted-foreground">
            Não foi possível encontrar o quarto ou as informações da reserva.
          </p>
          <Link to="/reserva">
            <Button>Voltar para Reservas</Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const totalPrice = calculateTotalPrice(room.pricePerNight, checkIn, checkOut);

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName || !guestEmail || !guestPhone || !guestCPF) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Validação básica de email
    if (!guestEmail.includes("@")) {
      alert("Por favor, insira um email válido");
      return;
    }

    // Abrir modal do Stripe
    setShowStripeModal(true);
  };

  const handlePaymentSuccess = () => {
    // Salvar reserva
    const reservation = saveReservation({
      roomId: room.id,
      roomName: room.name,
      guestName,
      guestEmail,
      guestPhone,
      guestCPF,
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
      numberOfGuests,
      totalPrice,
      status: "confirmed",
    });

    // Redirecionar para página de confirmação
    alert(`Reserva confirmada com sucesso! ID: ${reservation.id}\n\nUm email de confirmação foi enviado para ${guestEmail}`);
    navigate("/");
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/reserva" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para seleção de quartos
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Informações do Hóspede</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="João da Silva"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="joao@exemplo.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(formatPhoneNumber(e.target.value))}
                          maxLength={15}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cpf" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          CPF
                        </Label>
                        <Input
                          id="cpf"
                          placeholder="123.456.789-00"
                          value={guestCPF}
                          onChange={(e) => setGuestCPF(formatCPF(e.target.value))}
                          maxLength={14}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-100">
                    <p className="mb-2 font-bold">💰 Política de Pagamento:</p>
                    <ul className="ml-4 list-disc space-y-1">
                      <li>50% do valor total será cobrado agora para confirmar a reserva.</li>
                      <li>Os 50% restantes deverão ser pagos no check-in na pousada.</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <p className="mb-2 font-medium">📋 Informações Importantes:</p>
                    <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
                      <li>Check-in: a partir das 14h00</li>
                      <li>Check-out: até 12h00</li>
                      <li>Documento com foto será solicitado no check-in</li>
                      <li>Cancelamento gratuito até 48h antes do check-in</li>
                    </ul>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Prosseguir para Pagamento
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <ReservationSummary
              room={room}
              checkIn={checkIn}
              checkOut={checkOut}
              numberOfGuests={numberOfGuests}
            />
          </div>
        </div>
      </div>

      {/* Stripe Checkout Modal */}
      <StripeCheckout
        open={showStripeModal}
        onClose={() => setShowStripeModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={totalPrice}
      />
    </PublicLayout>
  );
}

