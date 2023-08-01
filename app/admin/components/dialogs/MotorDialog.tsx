"use client";

import Dialog from "@/components/modal/Dialog";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { marks } from "@/public/data/marks";

import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Motor } from "@prisma/client";
import useMessage from "@/app/hooks/useMessage";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useMutation, useQueryClient } from "react-query";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

interface MotorDialogProps {
  open: boolean;
  onClose: () => void;
  variant: "create" | "edit";
  motor?: Motor;
  motorsVariant: "repas" | "old";
}

type FormValues = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  markName: string | undefined;
  price: number | undefined;
  images: string[] | undefined;
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
  images: z.array(z.string()).nonempty("Nahrajte alespoň jeden obrázek"),
});

const MotorDialog: FC<MotorDialogProps> = ({
  open,
  onClose,
  variant,
  motor,
  motorsVariant,
}) => {
  const message = useMessage();
  const queryClient = useQueryClient();

  const dataMarks = marks?.map((mark) => mark.name);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: motor?.id ?? undefined,
      name: motor?.name ?? undefined,
      description: motor?.description ?? undefined,
      markName: motor?.markName ?? undefined,
      price: motor?.price ?? undefined,
      images: motor?.images ?? undefined,
    },
  });

  const watchImages = watch("images");

  const handleUpload = (result: any) => {
    const imageUrl = result?.info?.secure_url;

    if (imageUrl) {
      // Get the current value of the "images" field

      // Combine the current images with the new image URL and store as an array
      const updatedImages = [...(watchImages ?? []), imageUrl];

      // Update the value of the "images" field
      setValue("images", updatedImages, {
        shouldValidate: true,
      });
    }
  };

  const createMutation = useMutation(
    async (formValues: FormValues) => {
      const { data } = await axios.post(`/api/admin/${motorsVariant}/create`, {
        ...formValues,
      });
      return data;
    },
    {
      onSuccess: () => {
        message.success("Motor byl úspěšně vytvořen");
        queryClient.invalidateQueries(
          motorsVariant === "repas" ? "motors" : "oldMotors"
        );
      },
      onError: (error) => {
        message.error(error as string);
      },
      onSettled: () => {
        reset();
        onClose();
      },
    }
  );

  const editMutation = useMutation(
    async (formValues: FormValues) => {
      const { data } = await axios.put(
        `/api/admin/${motorsVariant}/${formValues.id}`,
        {
          ...formValues,
        }
      );
      return data;
    },
    {
      onSuccess: () => {
        message.success("Motor byl úspěšně upraven");
        queryClient.invalidateQueries(
          motorsVariant === "repas" ? "motors" : "oldMotors"
        );
      },
      onError: (error) => {
        message.error(error as string);
      },
      onSettled: () => {
        reset();
        onClose();
      },
    }
  );

  const handleDeleteImage = (image: string) => {
    setValue(
      "images",
      watchImages?.map((img) => img).filter((img) => img !== image),
      {
        shouldValidate: true,
      }
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    if (variant === "create") {
      createMutation.mutate(formValues);
    } else {
      editMutation.mutate(formValues);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      title={variant === "create" ? "Nový motor" : "Upravit motor"}
      onSubmit={handleSubmit(onSubmit)}
      submitDisabled={isSubmitting}
    >
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
                onChange={(e) => {
                  const updatedValue = e.target.value.replace(/\r?\n/g, "\n");
                  field.onChange(updatedValue);
                }}
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
                onChange={(_event, value) => field.onChange(value as string)}
                placeholder="Zadajte znacku motoru"
                options={dataMarks ?? []}
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
        <Controller
          name="images"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl size="small" error={!!fieldState.error}>
              <div className="flex flex-col justify-center items-center gap-5">
                {watchImages?.map((img) => (
                  <div key={img} className="flex flex-col items-end">
                    <Chip
                      icon={<DeleteIcon />}
                      label="Smazat fotku"
                      color="error"
                      onClick={() => handleDeleteImage(img)}
                    />
                    <Image src={img} alt="test" width={400} height={400} />
                  </div>
                ))}
                <CldUploadButton
                  options={{ maxFiles: 5 }}
                  onUpload={handleUpload}
                  uploadPreset="x9zk83j9"
                >
                  <Chip
                    className="flex flex-row gap-5"
                    label="Nahrát obrázky"
                    clickable
                    icon={<CloudUploadOutlinedIcon />}
                  />
                </CldUploadButton>

                {!!fieldState.error && (
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                )}
              </div>
            </FormControl>
          )}
        />
      </Stack>
    </Dialog>
  );
};

export default MotorDialog;
