"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Trash2 } from "lucide-react";
import type { Motor } from "@prisma/client";

export const getColumns = (
  onUpdateMotor: (motor: Motor) => void,
  onDeleteMotor: (motor: Motor) => void
): ColumnDef<Motor>[] => [
  {
    accessorKey: "id",
    header: "ID",
    meta: {
      flex: 1,
    },
  },
  {
    accessorKey: "name",
    header: "Název",
    meta: {
      flex: 1,
    },
  },
  {
    accessorKey: "description",
    header: "Popis",
    meta: {
      flex: 1,
    },
  },
  {
    accessorKey: "markName",
    header: "Značka",
    meta: {
      flex: 0.5,
    },
  },
  {
    accessorKey: "price",
    header: "Cena",
    meta: {
      flex: 0.5,
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("cs-CZ", {
        style: "currency",
        currency: "CZK",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Akce",
    meta: {
      flex: 0.3,
      align: "right",
      headerAlign: "right",
    },
    cell: ({ row }) => {
      const motor = row.original;

      return (
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onUpdateMotor(motor)}
                  className="h-8 w-8 p-0 cursor-pointer hover:text-red-500 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upravit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteMotor(motor)}
                  className="h-8 w-8 p-0 cursor-pointer hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Smazat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
