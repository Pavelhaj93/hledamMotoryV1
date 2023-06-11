"use client";

import Dialog from "@/components/modal/Dialog";
import useMessage from "@/app/hooks/useMessage";
import { Motor } from "@prisma/client";
import axios from "axios";
import React, { FC } from "react";

interface DeleteMotorDialogProps {
  open: boolean;
  onClose: () => void;
  motor: Motor | null;
}

const DeleteMotorDialog: FC<DeleteMotorDialogProps> = ({
  open,
  onClose,
  motor,
}) => {
  const message = useMessage();
  const onDelete = (motorId: Motor["id"]) => {
    axios
      .delete(`/api/admin/${motorId}`)
      .catch((err) => {
        message.error(err.message);
      })
      .then(() => {
        onClose();
      });
  };

  if (!motor) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      submitTitle="Smazat"
      onSubmit={() => onDelete(motor?.id)}
    >
      Opravdu chcete smazat <strong>{motor?.name}</strong>?
    </Dialog>
  );
};

export default DeleteMotorDialog;
