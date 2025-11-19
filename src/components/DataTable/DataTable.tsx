import {
  type ColumnDef,
  type ColumnDefTemplate,
  type HeaderContext,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Paginate,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";

import React, { useMemo } from "react";

import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type TableColumn<T> = {
  key: string;
  label: string | React.ReactNode;
  selector?: (item: T, index: number) => any;
  sorter?: boolean;
  hidden?: boolean;
};

export type DataTableProps<T> = {
  columns: Array<TableColumn<T>>;
  items: T[];
  itemKey: keyof T;
  sort?: string; // ex: 'name:asc,email:desc'
  page: number;
  rowsPerPage: number;
  headerComponent?: React.ReactNode;
  total: number;
  loading?: boolean;
  emptyText?: string;
  pagination?: boolean;
  getRowClassName?: (item: T, index: number) => string;
  isPrimaryRow?: (item: T, index: number) => boolean;
  onRowClick?: (item: T) => void;
  onSortChange?: (sort: string) => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
};

export const DataTable = <T,>({
  className,
  columns,
  items = [],
  itemKey,
  emptyText = "Nenhum registro encontrado",
  sort,
  page,
  rowsPerPage,
  total,
  headerComponent,
  pagination = true,
  loading,
  getRowClassName,
  isPrimaryRow,
  onRowClick,
  onSortChange,
  onPageChange,
  onRowsPerPageChange,
}: React.ComponentProps<typeof Table> & DataTableProps<T>) => {
  const internalColumnsDef: ColumnDef<T>[] = useMemo(
    () =>
      columns
        .filter((column) => !column.hidden)
        .map((column) => {
          return {
            id: column.key,
            accessorKey: column.key,
            header: column.label as ColumnDefTemplate<HeaderContext<T, any>>,
            enableSorting: !!column.sorter,
            cell: ({ row, cell }) => {
              if (column.selector) {
                return column.selector(row.original, row.index);
              }
              return cell.getValue();
            },
          };
        }),
    [columns]
  );

  const internalSortingState: SortingState =
    sort?.split(",").map((s) => {
      const [sortKey, sortDirection] = s.split(":");
      return {
        id: sortKey,
        desc: sortDirection === "desc",
      };
    }) ?? [];

  const table = useReactTable({
    columns: internalColumnsDef,
    data: items,
    state: {
      sorting: internalSortingState,
    },
    getRowId: (row) => String(row[itemKey]),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: (sorting) => {
      const newSorting =
        typeof sorting === "function" ? sorting(internalSortingState) : sorting;

      onSortChange?.(
        newSorting.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`).join(",")
      );
    },
  });

  return (
    <div className={cn(className)}>
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px] w-full">
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin" />
            <p className="mt-2">Carregando...</p>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="mb-4">{headerComponent}</div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sorted = header.column.getIsSorted();

                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              "flex gap-1",
                              header.column.getCanSort() && "cursor-pointer"
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                            {header.column.getCanSort() && (
                              <span className="inline-block ml-1 align-middle">
                                {sorted === "asc" ? (
                                  <ArrowDownAZ className="w-4 h-4 inline" />
                                ) : sorted === "desc" ? (
                                  <ArrowUpAZ className="w-4 h-4 inline" />
                                ) : (
                                  <ArrowUpDown className="w-4 h-4 inline" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => onRowClick?.(row.original)}
                      className={cn(
                        getRowClassName?.(row.original, row.index),
                        isPrimaryRow?.(row.original, row.index)
                          ? "bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
                          : row.index % 2 === 1
                            ? "bg-gray-50"
                            : ""
                      )}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <TableCell
                          key={cell.id}
                          className={cn("max-w-[200px] truncate", [
                            cellIndex === 0 && "first:rounded-l-md",
                            cellIndex === row.getVisibleCells().length - 1 &&
                              "last:rounded-r-md",
                          ])}
                          width={cell.column.columnDef.size}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="max-w-[200px] truncate"
                    colSpan={columns.length}
                  >
                    {emptyText}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {pagination && (
                    <Paginate
                      page={page}
                      rowsPerPage={rowsPerPage}
                      total={total}
                      onPageChange={onPageChange ?? (() => {})}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </React.Fragment>
      )}
    </div>
  );
};
