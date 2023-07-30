"use client";

import Dialog from "@/components/modal/Dialog";
import useMessage from "@/app/hooks/useMessage";
import { Motor } from "@prisma/client";
import axios from "axios";
import React, { FC } from "react";
import { useMutation, useQueryClient } from "react-query";

interface DeleteMotorDialogProps {
  open: boolean;
  onClose: () => void;
  motor: Motor | null;
  motorsVariant: "repas" | "old";
}

const DeleteMotorDialog: FC<DeleteMotorDialogProps> = ({
  open,
  onClose,
  motor,
  motorsVariant,
}) => {
  const message = useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (motorId: string) => {
      const { data } = await axios.delete(
        `/api/admin/${motorsVariant}/${motorId}`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        message.success(`Motor s id ${data} byl úspěšně smazán.`);
        queryClient.invalidateQueries(
          motorsVariant === "repas" ? "motors" : "oldMotors"
        );
        onClose();
      },
      onError: (error) => {
        message.error(error as string);
      },
    }
  );

  if (!motor) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      submitTitle="Smazat"
      onSubmit={() => mutate(motor?.id)}
    >
      Opravdu chcete smazat <strong>{motor?.name}</strong>?
    </Dialog>
  );
};

export default DeleteMotorDialog;
