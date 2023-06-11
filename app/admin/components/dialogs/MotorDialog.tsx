"use client";

import Dialog from "@/components/modal/Dialog";
import {
  Alert,
  Autocomplete,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Motor } from "@prisma/client";
import { useRouter } from "next/navigation";
import useMessage from "@/app/hooks/useMessage";

interface MotorDialogProps {
  open: boolean;
  onClose: () => void;
  marks: Mark["name"][];
  variant: "create" | "edit";
  motor?: Motor;
}

interface Mark {
  id: string;
  name: string;
}

export const Refetch = () => {
  console.log("refetch");
};

const formSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "Zadajte název motoru" })
    .nonempty("Zadajte název motoru"),
  description: z.string().nonempty("Zadajte popis motoru"),
  markName: z
    .string({ required_error: "Vyberte značku motoru" })
    .nonempty("Vyberte značku motoru"),
  price: z.preprocess(
    Number,
    z.number({ invalid_type_error: "Cena musí obsahovat čísla" })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const MotorDialog: FC<MotorDialogProps> = ({
  open,
  onClose,
  marks,
  variant,
  motor,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: motor?.id ?? undefined,
      name: motor?.name ?? undefined,
      description: motor?.description ?? undefined,
      markName: motor?.markName ?? undefined,
      price: motor?.price ?? undefined,
    },
  });

  const message = useMessage();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (variant === "create") {
      axios
        .post("/api/admin/motor/create", {
          ...data,
        })
        .catch((err) => {
          message.error(err.response.data.message);
        })
        .then(() => {
          message.success("Motor byl úspěšně vytvořen");
        });
    } else {
      axios
        .put(`/api/admin/${motor?.id}`, {
          ...data,
        })
        .catch((err) => {
          message.error(err.response.data.message);
        })
        .then(() => {
          message.success("Motor byl úspěšně upraven");
        });
    }
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      title={variant === "create" ? "Nový motor" : "Upravit motor"}
      submitTitle="Vytvorit"
      onSubmit={handleSubmit(onSubmit)}
      submitDisabled={isSubmitting}
    >
      {/* if error from response then show alert 
       {Object.values(errors).length ? (
        <Alert severity="error">{errors.root?.message}</Alert>
      ) : null}  */}
      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl size="small" error={!!fieldState.error}>
              <TextField placeholder="Zadajte název motoru" {...field} />
              {!!fieldState.error && (
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl size="small" error={!!fieldState.error}>
              <TextField
                placeholder="Zadajte popis motoru"
                {...field}
                multiline
                rows={6}
              />
              {!!fieldState.error && (
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="markName"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl size="small" error={!!fieldState.error}>
              <Autocomplete
                value={field.value}
                onChange={(_event, value) => field.onChange(value)}
                placeholder="Zadajte znacku motoru"
                options={marks}
                renderInput={(params) => (
                  <TextField {...params} label="Znacka motoru" />
                )}
              />
              {!!fieldState.error && (
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl size="small" error={!!fieldState.error}>
              <TextField placeholder="Zadajte cenu motoru" {...field} />
              {!!fieldState.error && (
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Stack>
      Zde bude input pro image
    </Dialog>
  );
};

export default MotorDialog;
