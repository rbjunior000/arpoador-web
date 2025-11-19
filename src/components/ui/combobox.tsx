import { Check, ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// --- Interfaces para as props do componente ---
export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum resultado encontrado.",
  className,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // Encontra a opção selecionada com base no valor atual
  const selectedOption = options.find((option) => option.value === value);

  // Função para lidar com a seleção de um item na lista
  const handleSelect = (selectedValue: string) => {
    // Se o item selecionado já for o valor atual, desmarca (limpa o valor)
    const newValue = selectedValue === value ? "" : selectedValue;
    onChange?.(newValue);
    setOpen(false); // Fecha o popover após a seleção
  };

  // Função para limpar o valor ao clicar no ícone "X"
  const handleClear = (e: React.MouseEvent) => {
    // CORREÇÃO: Impede que o clique no "X" se propague para o botão.
    // Sem isso, o popover abriria novamente logo após limpar o valor.
    e.stopPropagation();
    onChange?.("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground", // Estilo para quando não há valor
            className
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center gap-1 ml-2 shrink-0">
            {/* Mostra o botão de limpar apenas se houver um valor e não estiver desabilitado */}
            {value && !disabled && (
              <X
                className="w-4 h-4 transition-opacity opacity-50 cursor-pointer hover:opacity-100"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="w-4 h-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)]" // CORREÇÃO: Garante que o popover tenha a mesma largura do botão
        align="start"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
