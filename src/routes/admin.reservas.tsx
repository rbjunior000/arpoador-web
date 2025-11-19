import { useState, useMemo } from "react";
import { Layout, DataTable, Badge } from "~/components";
import { getAllReservations, type Reservation, type ReservationStatus } from "~/lib/mock-data";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Calendar, Search, Filter } from "lucide-react";
import type { TableColumn } from "~/components/DataTable/DataTable";

export default function AdminReservas() {
  const allReservations = getAllReservations();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Filter reservations
  const filteredReservations = useMemo(() => {
    let filtered = allReservations;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (res) =>
          res.guestName.toLowerCase().includes(term) ||
          res.guestEmail.toLowerCase().includes(term) ||
          res.roomName.toLowerCase().includes(term) ||
          res.id.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((res) => res.status === statusFilter);
    }

    return filtered;
  }, [allReservations, searchTerm, statusFilter]);

  // Paginate
  const paginatedReservations = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredReservations.slice(start, end);
  }, [filteredReservations, page, rowsPerPage]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: ReservationStatus) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pendente" },
      confirmed: { variant: "default" as const, label: "Confirmada" },
      cancelled: { variant: "destructive" as const, label: "Cancelada" },
      completed: { variant: "outline" as const, label: "Concluída" },
    };

    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const columns: TableColumn<Reservation>[] = [
    {
      key: "id",
      label: "ID",
      selector: (item) => (
        <span className="font-mono text-xs">{item.id}</span>
      ),
    },
    {
      key: "guestName",
      label: "Hóspede",
      selector: (item) => (
        <div>
          <div className="font-medium">{item.guestName}</div>
          <div className="text-xs text-muted-foreground">{item.guestEmail}</div>
        </div>
      ),
      sorter: true,
    },
    {
      key: "roomName",
      label: "Quarto",
      selector: (item) => item.roomName,
      sorter: true,
    },
    {
      key: "checkIn",
      label: "Check-in",
      selector: (item) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(item.checkIn)}</span>
        </div>
      ),
      sorter: true,
    },
    {
      key: "checkOut",
      label: "Check-out",
      selector: (item) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(item.checkOut)}</span>
        </div>
      ),
      sorter: true,
    },
    {
      key: "numberOfGuests",
      label: "Hóspedes",
      selector: (item) => (
        <span className="text-center block">{item.numberOfGuests}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      selector: (item) => getStatusBadge(item.status),
      sorter: true,
    },
    {
      key: "totalPrice",
      label: "Valor Total",
      selector: (item) => (
        <span className="font-semibold">{formatPrice(item.totalPrice)}</span>
      ),
      sorter: true,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as reservas da pousada
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold">{allReservations.length}</div>
            <div className="text-sm text-muted-foreground">Total de Reservas</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-green-600">
              {allReservations.filter((r) => r.status === "confirmed").length}
            </div>
            <div className="text-sm text-muted-foreground">Confirmadas</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {allReservations.filter((r) => r.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(
                allReservations
                  .filter((r) => r.status !== "cancelled")
                  .reduce((sum, r) => sum + r.totalPrice, 0)
              )}
            </div>
            <div className="text-sm text-muted-foreground">Receita Total</div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filtros</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome, email, quarto ou ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirmed">Confirmada</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          <DataTable
            columns={columns}
            items={paginatedReservations}
            itemKey="id"
            page={page}
            rowsPerPage={rowsPerPage}
            total={filteredReservations.length}
            onPageChange={setPage}
            emptyText="Nenhuma reserva encontrada"
          />
        </div>
      </div>
    </Layout>
  );
}

