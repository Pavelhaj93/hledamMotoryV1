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

import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Mark, Motor } from "@prisma/client";
import useMessage from "@/app/hooks/useMessage";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface MotorDialogProps {
  open: boolean;
  onClose: () => void;
  variant: "create" | "edit";
  motor?: Motor;
  motorsVariant: "repas" | "old";
}

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
  image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MotorDialog: FC<MotorDialogProps> = ({
  open,
  onClose,
  variant,
  motor,
  motorsVariant,
}) => {
  const message = useMessage();
  const queryClient = useQueryClient();

  const { data } = useQuery<Mark[]>(
    "marks",
    async () => {
      const { data } = await axios.get("/api/marks");
      return data;
    },
    {
      onError: (error) => {
        message.error(error as string);
        console.error(error);
      },
    }
  );

  const dataMarks = data?.map((mark) => mark.name);

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
      image: motor?.image ?? undefined,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
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
        queryClient.invalidateQueries("motors");
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
        queryClient.invalidateQueries("motors");
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
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl size="small" error={!!fieldState.error}>
              <div className="flex flex-col justify-center items-center gap-5">
                <Image
                  src={image ?? motor?.image ?? "/images/placeholder.png"}
                  alt="test"
                  width={400}
                  height={400}
                />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUpload}
                  uploadPreset="x9zk83j9"
                >
                  <Chip
                    className="flex flex-row gap-5"
                    label="Nahrát obrázek"
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
