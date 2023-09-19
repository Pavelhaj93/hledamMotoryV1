"use client";

import AdminDataGrid from "@/components/dataGrid/AdminDataGrid";
import axios from "axios";
import React, { FC, useState } from "react";
import { getColumns } from "./Motors.columns";

import DeleteMotorDialog from "./dialogs/DeleteMotorDialog";
import { Motor } from "@prisma/client";
import MotorDialog from "./dialogs/MotorDialog";
import useMessage from "@/app/hooks/useMessage";
import { useQuery, useQueryClient } from "react-query";

interface MotorsDataGridProps {
  motorsVariant: "repas" | "old";
}

const MotorsDataGrid: FC<MotorsDataGridProps> = ({ motorsVariant }) => {
  const message = useMessage();

  const [openUpdateModal, setOpenUpdateModal] = useState<Motor | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<Motor | null>(null);

  const { data, isLoading } = useQuery(
    motorsVariant === "repas" ? "motors" : "oldMotors",
    async () => {
      const { data } = await axios.get(`/api/admin/${motorsVariant}/motors`);
      return data;
    },
    {
      onError: (error) => {
        message.error(error as string);
        console.error(error);
      },
    }
  );

  if (!data) {
    return <h2 className="text-4xl font-black">Načítám motory...</h2>;
  }

  return (
    <>
      <AdminDataGrid
        disableColumnMenu
        rows={data}
        columns={getColumns(setOpenUpdateModal, setOpenDeleteModal)}
        loading={isLoading}
        hideFooter
        autoHeight
      />
      {openUpdateModal && (
        <MotorDialog
          open={!!openUpdateModal}
          onClose={() => setOpenUpdateModal(null)}
          motor={openUpdateModal}
          variant="edit"
          motorsVariant={motorsVariant}
        />
      )}

      <DeleteMotorDialog
        open={!!openDeleteModal}
        onClose={() => setOpenDeleteModal(null)}
        motor={openDeleteModal}
        motorsVariant={motorsVariant}
      />
    </>
  );
};

export default MotorsDataGrid;
