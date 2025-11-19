import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Public routes
  index("routes/home.tsx"),
  route("reserva", "routes/reserva.tsx"),
  route("reserva/:quartoId", "routes/reserva.$quartoId.tsx"),
  
  // Admin routes
  route("admin/reservas", "routes/admin.reservas.tsx"),
  route("admin/quartos", "routes/admin.quartos.tsx"),
  route("admin/configuracoes", "routes/admin.configuracoes.tsx"),
  
  // Auth
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
