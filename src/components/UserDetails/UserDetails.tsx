import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UserResponseDto } from "@/~client";
import { Link } from "react-router";

type UserDetailsProps = {
  user: UserResponseDto;
};

const roleMap: Record<string, string> = {
  admin: "Administrador",
  staff: "Staff",
  member: "Membro",
  instructor: "Instrutor",
  casual_user: "Usuário Casual",
};

export const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Detalhes do Cliente</CardTitle>
            <CardDescription>
              Informações completas sobre o cliente
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Link to={`/clientes/${user.id}/edit`}>
              <Button variant="outline">Editar</Button>
            </Link>
            <Link to="/clientes">
              <Button variant="ghost">Voltar</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Nome Completo
              </h3>
              <p className="text-base">{user.fullName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Email
              </h3>
              <p className="text-base">{user.email || "-"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Telefone
              </h3>
              <p className="text-base">{user.phone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                WhatsApp
              </h3>
              <p className="text-base">{user.whatsappNumber || "-"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                ID do Guarda
              </h3>
              <p className="text-sm font-mono">{user.guardId}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Papel
              </h3>
              <Badge variant="default">
                {roleMap[user.role] || user.role}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <Badge variant={user.isActive ? "default" : "destructive"}>
                {user.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Email Verificado
              </h3>
              <Badge variant={user.emailVerified ? "default" : "outline"}>
                {user.emailVerified ? "Sim" : "Não"}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Telefone Verificado
              </h3>
              <Badge variant={user.phoneVerified ? "default" : "outline"}>
                {user.phoneVerified ? "Sim" : "Não"}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Data de Cadastro
              </h3>
              <p className="text-base">
                {new Date(user.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Última Atualização
              </h3>
              <p className="text-base">
                {new Date(user.updatedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {user.avatarUrl && (
            <div className="col-span-full">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Avatar
              </h3>
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

