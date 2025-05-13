"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useMessage from "@/app/hooks/useMessage";
import React from "react";

const formSchema = z.object({
  name: z.string().nonempty("Zadejte jméno"),
  email: z.string().nonempty("Zadejte email"),
  message: z.string().nonempty("Zadejte zprávu"),
  motorVariant: z.string().optional(),
  acceptPrivacyPolicy: z.literal(true, {
    errorMap: () => ({
      message: "Musíte souhlasit s podmínkami ochrany osobních údajů",
    }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  motorId?: string;
  motorName?: string;
  motorSlug?: string;
  motorVariant?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  motorId,
  motorName,
  motorSlug,
  motorVariant = "",
}) => {
  const message = useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: motorName ? `Mám zájem o motor ${motorName}` : "",
      motorVariant,
      acceptPrivacyPolicy: false,
    },
  });

  const mutation = useMutation(
    async (formValues: FormValues) => {
      const response = await fetch(
        motorId ? `/api/contact/${motorSlug}` : "/api/contact",
        {
          method: "POST",
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      return await response.json();
    },
    {
      onError: () => {
        message.error("Při odesílání zprávy došlo k chybě");
      },
      onSuccess: () => {
        message.success("Zpráva byla úspěšně odeslána");
      },
    }
  );

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    mutation.mutate(formValues);
  };

  return (
    <div className="w-full max-lg:w-full max-w-xl">
      <h3 className="text-2xl font-bold mb-9 max-lg:mb-7 max-lg:text-center mt-5">
        Nebo využijte náš formulář a my se vám ozveme
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name">Jméno a příjmení</Label>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Váš email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">Zpráva</Label>
          <Textarea
            id="message"
            className="h-32 resize-none"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="space-y-2 my-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="acceptPrivacyPolicy"
              {...register("acceptPrivacyPolicy")}
            />
            <Label
              htmlFor="acceptPrivacyPolicy"
              className="text-muted-foreground"
            >
              Souhlasím s{" "}
              <a
                href="/ochrana-osobnich-udaju"
                className="underline text-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                podmínkami ochrany osobních údajů
              </a>
            </Label>
          </div>
          {errors.acceptPrivacyPolicy && (
            <p className="text-sm text-red-600 max-lg:text-center">
              {errors.acceptPrivacyPolicy.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={mutation.isLoading || isSubmitting}
          className="w-1/2 max-lg:w-full"
        >
          Odeslat
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
