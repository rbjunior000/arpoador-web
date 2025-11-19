import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LucideIcon } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

export type ActionItem<T> = {
  label: string;
  onClick: (item: T) => void;
  icon?: LucideIcon;
  className?: string;
  withSeparator?: boolean;
};

type ColumnActionsProps<T> = {
  item: T;
  actions: ActionItem<T>[];
  label?: string;
};

export const ColumnActions = <T,>({
  item,
  actions,
  label = "Ações",
}: ColumnActionsProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir ações</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {actions.map(
          ({ label, onClick, icon: Icon, className, withSeparator }, i) => (
            <div key={i}>
              <DropdownMenuItem
                onClick={() => onClick(item)}
                className={`cursor-pointer ${className ?? ""}`}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {label}
              </DropdownMenuItem>

              {withSeparator && <DropdownMenuSeparator />}
            </div>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
