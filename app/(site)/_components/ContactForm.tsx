"use client";

import useMessage from "@/app/hooks/useMessage";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("Zadejte jméno"),
  email: z.string().nonempty("Zadejte email"),
  message: z.string().nonempty("Zadejte zprávu"),
  motorVariant: z.string(),
  acceptPrivacyPolicy: z.boolean().refine((value) => value === true, {
    message: "Musíte souhlasit s podmínkami ochrany osobních údajů",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function sendEmail(data: FormValues) {
  const apiEndpoint = data.motorVariant
    ? `/api/contact/${data.motorVariant}`
    : "/api/contact";

  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Failed to send the message");
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

interface ContactFormProps {
  motorId?: string;
  motorName?: string;
  motorSlug?: string;
  motorVariant?: string;
}

const ContactForm: FC<ContactFormProps> = ({
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

  const onSubmit = async (data: FormValues) => {
    sendEmail(data);
  };

  return (
    <div className="max-lg:w-full w-1/2">
      <h3 className="max-lg:text-center max-lg:mb-7 mb-9 mt-5 font-bold text-2xl">
        Nebo využijte náš formulář a my se vám ozveme
      </h3>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            type="text"
            label="Jméno a příjmení"
            register={register as keyof typeof register}
            error={errors.name}
          />
          <Input
            id="email"
            label="Váš email"
            type="email"
            register={register as keyof typeof register}
            error={errors.email}
          />
          <TextArea
            id="message"
            label="Zpráva"
            register={register as keyof typeof register}
            error={errors.message}
            textCenter="left"
            className="h-32"
          />

          {/* Privacy policy checkbox */}
          <div className="flex flex-col my-8">
            <div className="flex items-center gap-6">
              <input
                type="checkbox"
                id="acceptPrivacyPolicy"
                {...register("acceptPrivacyPolicy")}
                className="w-6 h-6 ml-6 text-red-600 border-gray-30 checked:bg-red-600 rounded focus:ring-red-500"
              />
              <label
                htmlFor="acceptPrivacyPolicy"
                className="lg:text-lg text-gray-700"
              >
                Souhlasím s{" "}
                <a
                  href="/ochrana-osobnich-udaju"
                  className="text-red-600 text-lg underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  podmínkami ochrany osobních údajů
                </a>
              </label>
            </div>
            {errors.acceptPrivacyPolicy && (
              <p className="text-red-600 text-sm max-lg:text-center">
                {errors.acceptPrivacyPolicy.message}
              </p>
            )}
          </div>

          <Button
            className="max-lg:w-full w-1/2 ml-0"
            type="submit"
            disabled={isSubmitting}
            color="primary"
            arrow
          >
            Odeslat
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
