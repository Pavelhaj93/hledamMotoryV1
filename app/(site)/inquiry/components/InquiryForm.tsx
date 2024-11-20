"use client";

import useMessage from "@/app/hooks/useMessage";
import { useRequestMotors } from "@/app/hooks/useRequestMotors";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const RequestMotorsSchema = z.object({
  mark: z.string().nullable(),
  model: z.string().nullable(),
  engineType: z.string().nullable(),
  textArea: z.string().nullable(),
});

const formSchema = z.object({
  email: z.string().email("Zadejte platný email"),
  phone: z
    .string()
    .nonempty("Zadejte telefon")
    .regex(/^\d+$/, "Pole nesmí obsahovat písmena ale jen číslice"),
  note: z.string().optional(),
  requests: z.array(RequestMotorsSchema),
  acceptPrivacyPolicy: z.boolean().refine((value) => value === true, {
    message: "Musíte souhlasit s podmínkami ochrany osobních údajů",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const InquiryForm = () => {
  const { requestMotors, setRequestMotors } = useRequestMotors();

  const message = useMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      note: "",
      requests: requestMotors ?? [],
      acceptPrivacyPolicy: false,
    },
  });

  const mutation = useMutation(
    async (formValues: FormValues) => {
      const { data } = await axios.post("/api/searchMotor", {
        ...formValues,
      });

      return data;
    },
    {
      onError: (error) => {
        console.log(error);
        message.error("Při odesílání zprávy došlo k chybě");
      },
      onSuccess: (data) => {
        message.success("Zpráva byla úspěšně odeslána");
      },
      onSettled: () => {
        reset();
        setRequestMotors([]);
      },
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    mutation.mutate(formValues);
  };

  return (
    <div className="flex flex-col items-start justify-center max-lg:gap-10 gap-2 max-lg:w-full w-1/2 h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Input
            id="email"
            type="email"
            placeholder="Emailová adresa"
            required
            rounded
            register={register as keyof typeof register}
            error={errors.email}
          />
          <Input
            id="phone"
            type="text"
            placeholder="Telefon"
            required
            rounded
            register={register as keyof typeof register}
            error={errors.phone}
          />
          <TextArea
            id="note"
            placeholder="Poznámka"
            rounded
            register={register as keyof typeof register}
            error={errors.note}
            textCenter="left"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
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
            color="primary"
            type="submit"
            className="w-full"
            arrow
            disabled={isSubmitting}
          >
            Odeslat poptávku
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
