"use client";

import { Tooltip } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Motor } from "@prisma/client";

export const getColumns = (
  onUpdateMotor: (motor: Motor) => void,
  onDeleteMotor: (motor: Motor) => void
): GridColDef[] => [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Název",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Popis",
    flex: 1,
  },
  {
    field: "markName",
    headerName: "Značka",
    flex: 0.5,
  },
  {
    field: "price",
    headerName: "Cena",
    flex: 0.5,
  },
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    flex: 0.3,
    align: "right",
    headerAlign: "right",
    getActions: ({ row }) => {
      return [
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Upravit">
              <EditOutlinedIcon />
            </Tooltip>
          }
          label="Edit"
          onClick={() => onUpdateMotor(row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Smazat">
              <DeleteIcon />
            </Tooltip>
          }
          label="Delete"
          onClick={() => onDeleteMotor(row)}
        />,
      ];
    },
  },
];
