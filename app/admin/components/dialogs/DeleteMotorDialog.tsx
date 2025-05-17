"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMessage from "@/app/hooks/useMessage";
import type { Motor } from "@prisma/client";
import axios from "axios";
import React, { type FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import type { ProductVariant } from "@/types/ProductVariant";

interface DeleteMotorDialogProps {
  open: boolean;
  onClose: () => void;
  motor: Motor | null;
  productVariant: ProductVariant;
}

const DeleteMotorDialog: FC<DeleteMotorDialogProps> = ({
  open,
  onClose,
  motor,
  productVariant,
}) => {
  const message = useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (motorId: string) => {
      const { data } = await axios.delete(
        `/api/admin/${productVariant}/${motorId}`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        message.success(`Motor s id ${data} byl úspěšně smazán.`);
        queryClient.invalidateQueries(["motors", productVariant], {
          exact: true,
        });
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Smazat motor</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <span>Opravdu chcete smazat</span>{" "}
          <span>
            <strong>{motor?.name}</strong>?
          </span>
        </div>
        <div className="w-full flex gap-2 mt-2">
          <Button onClick={() => mutate(motor?.id)} className="w-full">
            Smazat
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Zrušit
          </Button>
        </div>
      </DialogContent>
      {/* <DialogFooter> */}

      {/* </DialogFooter> */}
    </Dialog>
  );
};

export default DeleteMotorDialog;
