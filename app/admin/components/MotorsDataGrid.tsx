"use client";

import AdminDataGrid from "@/components/dataGrid/AdminDataGrid";
import axios from "axios";
import React, { FC, useState } from "react";
import { getColumns } from "./Motors.columns";

import DeleteMotorDialog from "./dialogs/DeleteMotorDialog";
import { Motor } from "@prisma/client";
import MotorDialog from "./dialogs/MotorDialog";
import useMessage from "@/app/hooks/useMessage";
import { useQuery } from "react-query";

interface MotorsDataGridProps {
  motorsVariant: "repas" | "old";
}

const MotorsDataGrid: FC<MotorsDataGridProps> = ({ motorsVariant }) => {
  const message = useMessage();

  const [openUpdateModal, setOpenUpdateModal] = useState<Motor | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<Motor | null>(null);

  const { data, isLoading, error } = useQuery(
    "motors",
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
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
