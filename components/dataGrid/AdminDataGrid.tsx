import { styled } from "@mui/material/styles";
import { DataGrid, DataGridProps, gridClasses } from "@mui/x-data-grid";

const AdminDataGrid = styled(DataGrid)<DataGridProps>(() => ({
  "& .actionButton": {
    display: "none",
  },
  [`& .${gridClasses.row}:hover`]: {
    ".actionButton": {
      display: "flex",
    },
  },

  "& .MuiDataGrid-columnHeaders": {
    textTransform: "uppercase",
  },

  "& .MuiDataGrid-columnSeparator:not(:hover)": {
    color: "transparent",
  },

  "& .MuiDataGrid-cellCheckbox:focus-within": {
    outline: "none",
  },

  "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },

  "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within":
    {
      outline: "none",
    },
}));

export default AdminDataGrid;
