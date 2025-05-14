"use client";

import { type FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronDown, CloudUpload, Edit, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { marks } from "@/public/data/marks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Motor } from "@prisma/client";
import useMessage from "@/app/hooks/useMessage";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { cn } from "@/lib/utils";

interface MotorDialogProps {
  open: boolean;
  onClose: () => void;
  variant: "create" | "edit";
  motor?: Motor;
  motorsVariant: "repas" | "old" | "motorHead";
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
  price: z.number().optional(),
  images: z.array(z.string()).nonempty("Nahrajte alespoň jeden obrázek"),
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
  const [openMarkCombobox, setOpenMarkCombobox] = useState(false);

  const dataMarks = marks?.map((mark) => mark.name);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: motor?.id,
      name: motor?.name,
      description: motor?.description ?? "",
      markName: motor?.markName,
      price: motor?.price ?? 0,
      images: motor?.images ?? [""],
    },
  });

  const watchImages = form.watch("images");

  // biome-ignore lint/suspicious/noExplicitAny: TODO: find correct type and fix
  const handleUpload = (result: any) => {
    const imageUrl = result?.info?.secure_url;

    if (imageUrl) {
      const updatedImages = [...(watchImages ?? []), imageUrl];
      form.setValue(
        "images",
        updatedImages.length > 0
          ? (updatedImages as [string, ...string[]])
          : [""],
        {
          shouldValidate: true,
        }
      );
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
        queryClient.invalidateQueries(["motors", motorsVariant]);
      },
      onError: (error) => {
        message.error(error as string);
      },
      onSettled: () => {
        form.reset();
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
        queryClient.invalidateQueries([
          "motors",
          motorsVariant,
          form.getValues("id"),
        ]);
      },
      onError: (error) => {
        message.error(error as string);
      },
      onSettled: () => {
        form.reset();
        onClose();
      },
    }
  );

  const handleDeleteImage = (image: string) => {
    const filteredImages = watchImages?.filter((img) => img !== image) || [];
    if (filteredImages.length > 0) {
      form.setValue("images", filteredImages as [string, ...string[]], {
        shouldValidate: true,
      });
    } else {
      form.setValue("images", [""], {
        shouldValidate: true,
      });
    }
  };

  const handleSelectPrimaryImage = (image: string) => {
    form.setValue(
      "images",
      [image, ...(watchImages?.filter((img) => img !== image) || [])],
      {
        shouldValidate: true,
      }
    );
  };

  const onSubmit = (formValues: FormValues) => {
    if (variant === "create") {
      createMutation.mutate(formValues);
    } else {
      editMutation.mutate(formValues);
    }
  };

  const handleDialogClose = () => {
    console.log("Dialog closed");
    form.reset();
    onClose();
  };

  const handleOpenChange = (newState: boolean) => {
    if (!newState) {
      handleDialogClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={false}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{titleConfig[variant][motorsVariant].title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Název motoru</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        titleConfig[variant][motorsVariant].namePlaceholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Popis motoru</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        titleConfig[variant][motorsVariant]
                          .descriptionPlaceholder
                      }
                      className="min-h-[120px]"
                      {...field}
                      onChange={(e) => {
                        const updatedValue = e.target.value.replace(
                          /\r?\n/g,
                          "\n"
                        );
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="markName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Značka motoru</FormLabel>
                  <Popover
                    open={openMarkCombobox}
                    onOpenChange={setOpenMarkCombobox}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          // biome-ignore lint/a11y/useSemanticElements: it needs to be a button
                          role="combobox"
                          aria-expanded={openMarkCombobox}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Vyberte značku motoru"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder={
                            titleConfig[variant][motorsVariant]
                              .markNamePlaceholder
                          }
                        />
                        <CommandList>
                          <CommandEmpty>Značka nenalezena.</CommandEmpty>
                          <CommandGroup className="max-h-[200px] md:w-[550px] overflow-y-auto">
                            {dataMarks?.map((mark) => (
                              <CommandItem
                                key={mark}
                                value={mark}
                                onSelect={() => {
                                  form.setValue("markName", mark, {
                                    shouldValidate: true,
                                  });
                                  setOpenMarkCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === mark
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {mark}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena motoru</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={
                        titleConfig[variant][motorsVariant].pricePlaceholder
                      }
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fotky</FormLabel>
                  <div className="flex flex-col gap-4">
                    <CldUploadButton
                      options={{ maxFiles: 5 }}
                      onUpload={handleUpload}
                      uploadPreset="x9zk83j9"
                    >
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        <CloudUpload className="mr-2 h-4 w-4" />
                        {watchImages && watchImages.length === 0
                          ? "Nahrát fotky"
                          : "Nahrát další fotky"}
                      </Button>
                    </CldUploadButton>

                    <div className="space-y-4">
                      {watchImages?.map((img, index) => (
                        <Card key={img} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative">
                              <Image
                                src={img || "/placeholder.svg"}
                                alt={`Motor image ${index + 1}`}
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover"
                              />
                              {index === 0 && (
                                <Badge className="absolute top-2 left-2 bg-primary">
                                  Hlavní fotka
                                </Badge>
                              )}
                            </div>
                            <div className="flex justify-end gap-2 p-3">
                              {index !== 0 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  type="button"
                                  onClick={() => handleSelectPrimaryImage(img)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Nastavit jako hlavní
                                </Button>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                type="button"
                                onClick={() => handleDeleteImage(img)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Smazat
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={handleDialogClose}
              >
                Zrušit
              </Button>
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {variant === "create" ? "Vytvořit" : "Uložit změny"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MotorDialog;

type TitleConfig = {
  create: {
    [key in "old" | "repas" | "motorHead"]: {
      title: string;
      namePlaceholder: string;
      descriptionPlaceholder: string;
      markNamePlaceholder: string;
      pricePlaceholder: string;
    };
  };
  edit: {
    [key in "old" | "repas" | "motorHead"]: {
      title: string;
      namePlaceholder: string;
      descriptionPlaceholder: string;
      markNamePlaceholder: string;
      pricePlaceholder: string;
    };
  };
};

const titleConfig: TitleConfig = {
  create: {
    old: {
      title: "Přidat starý motor",
      namePlaceholder: "Zadejte název starého motoru",
      descriptionPlaceholder: "Zadejte popis starého motoru",
      markNamePlaceholder: "Zadejte značku starého motoru",
      pricePlaceholder: "Zadejte cenu starého motoru",
    },
    repas: {
      title: "Přidat repasovaný motor",
      namePlaceholder: "Zadejte název repasovaného motoru",
      descriptionPlaceholder: "Zadejte popis repasovaného motoru",
      markNamePlaceholder: "Zadejte značku repasovaného motoru",
      pricePlaceholder: "Zadejte cenu repasovaného motoru",
    },
    motorHead: {
      title: "Přidat motorovou hlavu",
      namePlaceholder: "Zadejte název motorové hlavy",
      descriptionPlaceholder: "Zadejte popis motorové hlavy",
      markNamePlaceholder: "Zadejte značku motorové hlavy",
      pricePlaceholder: "Zadejte cenu motorové hlavy",
    },
  },
  edit: {
    old: {
      title: "Upravit starý motor",
      namePlaceholder: "Zadejte název starého motoru",
      descriptionPlaceholder: "Zadejte popis starého motoru",
      markNamePlaceholder: "Zadejte značku starého motoru",
      pricePlaceholder: "Zadejte cenu starého motoru",
    },
    repas: {
      title: "Upravit repasovaný motor",
      namePlaceholder: "Zadejte název repasovaného motoru",
      descriptionPlaceholder: "Zadejte popis repasovaného motoru",
      markNamePlaceholder: "Zadejte značku repasovaného motoru",
      pricePlaceholder: "Zadejte cenu repasovaného motoru",
    },
    motorHead: {
      title: "Upravit motorovou hlavu",
      namePlaceholder: "Zadejte název motorové hlavy",
      descriptionPlaceholder: "Zadejte popis motorové hlavy",
      markNamePlaceholder: "Zadejte značku motorové hlavy",
      pricePlaceholder: "Zadejte cenu motorové hlavy",
    },
  },
};
