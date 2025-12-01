import { Link } from "react-router";
import { Button } from "@/components/ui";

export type PublicLayoutProps = {
  children: React.ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="Pousada Arpoador" className="h-12 w-auto object-contain" />
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Início</Button>
            </Link>
            <Link to="/reserva">
              <Button variant="ghost">Reservar</Button>
            </Link>
            <Link to="/admin/reservas">
              <Button variant="outline">Admin</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Pousada Arpoador</h3>
              <p className="text-sm text-muted-foreground">
                Sua melhor escolha para uma estadia inesquecível à beira-mar.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contato</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📞 (21) 99999-9999</li>
                <li>✉️ contato@pousadaarpoador.com.br</li>
                <li>📍 Rua do Arpoador, 123 - Rio de Janeiro</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Horário de Check-in/out</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Check-in: 14h00</li>
                <li>Check-out: 12h00</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pousada Arpoador. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

