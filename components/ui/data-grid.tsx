"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface DataGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  showingText?: string;
  toText?: string;
  ofText?: string;
  resultsText?: string;
}

export function DataGrid<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  className,
  searchPlaceholder = "Hledat...",
  noResultsMessage = "Žádné výsledky.",
  showingText = "Zobrazeno",
  toText = "až",
  ofText = "z",
  resultsText = "výsledků",
}: DataGridProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  // Function to handle page input
  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    if (page >= 0 && page < table.getPageCount()) {
      table.setPageIndex(page);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Global search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 w-full sm:w-[250px] bg-white"
              leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
              rightIcon={
                globalFilter && (
                  <Button
                    size="sm"
                    onClick={() => setGlobalFilter("")}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Vymazat vyhledávání</span>
                  </Button>
                )
              }
            />
          </div>

          {/* Column visibility using Popover instead of DropdownMenu */}
          <Popover
            open={isColumnSelectorOpen}
            onOpenChange={setIsColumnSelectorOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="ml-auto h-[46px] bg-white hover:bg-red-500 transition-colors hover:text-white"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Sloupce
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[200px] p-0">
              <div className="p-2">
                <div className="text-sm font-medium mb-2">Zobrazit sloupce</div>
                <div className="space-y-2">
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== "undefined" &&
                        column.getCanHide()
                    )
                    .map((column) => {
                      return (
                        <div
                          key={column.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`column-${column.id}`}
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          />
                          <Label
                            htmlFor={`column-${column.id}`}
                            className="text-sm capitalize cursor-pointer"
                          >
                            {column.id}
                          </Label>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="border-t p-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsColumnSelectorOpen(false)}
                >
                  Hotovo
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Results count */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <p>
            {showingText}{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>{" "}
            {toText}{" "}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>{" "}
            {ofText}{" "}
            <span className="font-medium">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            {resultsText}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      header.column.columnDef.meta?.headerAlign === "right"
                        ? "text-right"
                        : ""
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-1",
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <div className="ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.columnDef.meta?.align === "right"
                          ? "text-right"
                          : ""
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Řádků na stránku</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Stránka</span>
            <Input
              type="number"
              min={1}
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={handlePageInput}
              className="h-8 w-16"
            />
            <span className="flex w-full items-center justify-center gap-2 mr-2">
              z <span className="text-xl mb-1">{table.getPageCount()}</span>
            </span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">První stránka</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Předchozí stránka</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Další stránka</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Poslední stránka</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
