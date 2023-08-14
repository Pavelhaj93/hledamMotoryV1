"use client";

import useMessage from "@/app/hooks/useMessage";
import { RequestMotor, useRequestMotors } from "@/app/hooks/useRequestMotors";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
  name: z.string().nonempty("Zadejte jméno"),
  surName: z.string().nonempty("Zadejte příjmení"),
  phone: z
    .string()
    .nonempty("Zadejte telefon")
    .regex(/^\d+$/, "Pole nesmí obsahovat písmena ale jen číslice"),
  city: z.string(),
  note: z.string(),
  requests: z.array(RequestMotorsSchema),
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
      name: "",
      surName: "",
      phone: "",
      city: "",
      note: "",
      requests: requestMotors ?? [],
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
            id="name"
            type="text"
            placeholder="Jméno"
            required
            rounded
            register={register as keyof typeof register}
            error={errors.name}
          />
          <Input
            id="surName"
            type="text"
            placeholder="Příjmení"
            required
            rounded
            register={register as keyof typeof register}
            error={errors.surName}
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
          <Input
            id="city"
            type="text"
            placeholder="Město"
            required
            rounded
            register={register as keyof typeof register}
            error={errors.city}
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
          <p className="my-4">
            Odesláním formuláře beru na vědomí zásady zpracování osobních údajů
            a také podmínky použití.
          </p>
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
