import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Button, Input, Label } from "@/components/ui";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

export type StripeCheckoutProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
};

export const StripeCheckout = ({ open, onClose, onSuccess, amount }: StripeCheckoutProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !expiry || !cvv) {
      alert("Por favor, preencha todos os campos do cartão");
      return;
    }

    setIsProcessing(true);

    // Simular processamento do pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Após 1.5s, fechar e chamar onSuccess
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    setIsProcessing(false);
    setIsSuccess(false);
    setCardNumber("");
    setExpiry("");
    setCvv("");
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Pagamento Seguro
          </DialogTitle>
          <DialogDescription>
            Simula um checkout do Stripe (dados não são reais)
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total a pagar:</span>
                <span className="text-2xl font-bold">{formatPrice(amount)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    disabled={isProcessing}
                  />
                  <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Validade</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))}
                    maxLength={4}
                    type="password"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-100">
              <Lock className="h-4 w-4" />
              <span>Seus dados estão protegidos com criptografia SSL</span>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isProcessing} className="flex-1">
                {isProcessing ? "Processando..." : `Pagar ${formatPrice(amount)}`}
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold">Pagamento Aprovado!</h3>
            <p className="mt-2 text-muted-foreground">
              Sua reserva foi confirmada com sucesso
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

