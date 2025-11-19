import { useState } from "react";
import { Layout } from "~/components";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { 
  Hotel, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  DollarSign,
  Bell,
  Shield,
  Palette,
  Save,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminConfiguracoes() {
  // Configurações da Pousada
  const [pousadaName, setPousadaName] = useState("Pousada Arpoador");
  const [email, setEmail] = useState("contato@pousadaarpoador.com.br");
  const [phone, setPhone] = useState("(21) 99999-9999");
  const [address, setAddress] = useState("Rua do Arpoador, 123 - Rio de Janeiro");
  const [description, setDescription] = useState("Sua melhor escolha para uma estadia inesquecível à beira-mar.");
  
  // Horários
  const [checkInTime, setCheckInTime] = useState("14:00");
  const [checkOutTime, setCheckOutTime] = useState("12:00");
  
  // Políticas
  const [cancellationHours, setCancellationHours] = useState("48");
  const [minStayDays, setMinStayDays] = useState("1");
  const [maxStayDays, setMaxStayDays] = useState("30");
  
  // Notificações
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [newReservationAlert, setNewReservationAlert] = useState(true);
  const [cancellationAlert, setCancellationAlert] = useState(true);
  
  // Pagamento
  const [acceptCreditCard, setAcceptCreditCard] = useState(true);
  const [acceptDebit, setAcceptDebit] = useState(true);
  const [acceptPix, setAcceptPix] = useState(true);
  const [depositPercentage, setDepositPercentage] = useState("50");
  
  // Website
  const [allowOnlineBooking, setAllowOnlineBooking] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [language, setLanguage] = useState("pt-BR");

  const handleSave = () => {
    // Simular salvamento
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-muted-foreground">
              Configure os parâmetros da pousada
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Informações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Informações Gerais
              </CardTitle>
              <CardDescription>
                Dados básicos da pousada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pousada-name">Nome da Pousada</Label>
                <Input
                  id="pousada-name"
                  value={pousadaName}
                  onChange={(e) => setPousadaName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereço
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Horários */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horários
              </CardTitle>
              <CardDescription>
                Defina os horários de check-in e check-out
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="check-in">Check-in</Label>
                <Input
                  id="check-in"
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="check-out">Check-out</Label>
                <Input
                  id="check-out"
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="cancellation">Cancelamento Gratuito (horas antes)</Label>
                <Input
                  id="cancellation"
                  type="number"
                  value={cancellationHours}
                  onChange={(e) => setCancellationHours(e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="min-stay">Estadia Mínima (dias)</Label>
                  <Input
                    id="min-stay"
                    type="number"
                    min="1"
                    value={minStayDays}
                    onChange={(e) => setMinStayDays(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-stay">Estadia Máxima (dias)</Label>
                  <Input
                    id="max-stay"
                    type="number"
                    min="1"
                    value={maxStayDays}
                    onChange={(e) => setMaxStayDays(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pagamento
              </CardTitle>
              <CardDescription>
                Configure as opções de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="credit-card">Aceitar Cartão de Crédito</Label>
                  <Switch
                    id="credit-card"
                    checked={acceptCreditCard}
                    onCheckedChange={setAcceptCreditCard}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="debit">Aceitar Cartão de Débito</Label>
                  <Switch
                    id="debit"
                    checked={acceptDebit}
                    onCheckedChange={setAcceptDebit}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="pix">Aceitar PIX</Label>
                  <Switch
                    id="pix"
                    checked={acceptPix}
                    onCheckedChange={setAcceptPix}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="deposit">Depósito Inicial (%)</Label>
                <Input
                  id="deposit"
                  type="number"
                  min="0"
                  max="100"
                  value={depositPercentage}
                  onChange={(e) => setDepositPercentage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Porcentagem a ser paga no momento da reserva
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure alertas e notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Notificações por Email</Label>
                  <p className="text-xs text-muted-foreground">
                    Receber alertas por email
                  </p>
                </div>
                <Switch
                  id="email-notif"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notif">Notificações por SMS</Label>
                  <p className="text-xs text-muted-foreground">
                    Receber alertas por SMS
                  </p>
                </div>
                <Switch
                  id="sms-notif"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label htmlFor="new-reservation">Novas Reservas</Label>
                <Switch
                  id="new-reservation"
                  checked={newReservationAlert}
                  onCheckedChange={setNewReservationAlert}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="cancellation-alert">Cancelamentos</Label>
                <Switch
                  id="cancellation-alert"
                  checked={cancellationAlert}
                  onCheckedChange={setCancellationAlert}
                />
              </div>
            </CardContent>
          </Card>

          {/* Website */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Website
              </CardTitle>
              <CardDescription>
                Configurações do site público
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="online-booking">Reservas Online</Label>
                    <p className="text-xs text-muted-foreground">
                      Permitir reservas pelo site
                    </p>
                  </div>
                  <Switch
                    id="online-booking"
                    checked={allowOnlineBooking}
                    onCheckedChange={setAllowOnlineBooking}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Modo Manutenção</Label>
                    <p className="text-xs text-muted-foreground">
                      Desabilitar acesso temporariamente
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma Padrão</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button - Bottom */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <Save className="mr-2 h-5 w-5" />
            Salvar Todas as Configurações
          </Button>
        </div>
      </div>
    </Layout>
  );
}

