"use client";

import AdminDataGrid from "@/components/dataGrid/AdminDataGrid";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { getColumns } from "./Motors.columns";

import DeleteMotorDialog from "./dialogs/DeleteMotorDialog";
import { Mark, Motor } from "@prisma/client";
import MotorDialog from "./dialogs/MotorDialog";

interface MotorsDataGridProps {
  marks: Array<Mark["name"]>;
}

const MotorsDataGrid: FC<MotorsDataGridProps> = ({ marks }) => {
  const [motors, setMotors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openUpdateModal, setOpenUpdateModal] = useState<Motor | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<Motor | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/admin/motors")
      .then((res) => {
        setMotors(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!motors) {
    return null;
  }

  return (
    <>
      <AdminDataGrid
        disableColumnMenu
        rows={motors}
        columns={getColumns(setOpenUpdateModal, setOpenDeleteModal)}
        loading={loading}
        hideFooter
        autoHeight
      />
      {openUpdateModal && (
        <MotorDialog
          open={!!openUpdateModal}
          onClose={() => setOpenUpdateModal(null)}
          marks={marks}
          motor={openUpdateModal}
          variant="edit"
        />
      )}

      <DeleteMotorDialog
        open={!!openDeleteModal}
        onClose={() => setOpenDeleteModal(null)}
        motor={openDeleteModal}
      />
    </>
  );
};

export default MotorsDataGrid;
