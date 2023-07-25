"use client";

import useMessage from "@/app/hooks/useMessage";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().nonempty("Zadejte email"),
  name: z.string().nonempty("Zadejte jméno"),
  surName: z.string().nonempty("Zadejte příjmení"),
  phone: z.string().nonempty("Zadejte telefon"),
  city: z.string().nonempty("Zadejte město"),
  note: z.string().nonempty("Zadejte poznámku"),
});

type FormValues = z.infer<typeof formSchema>;

const InquiryForm = () => {
  const message = useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation(
    async (formValues: FormValues) => {
      const { data } = await axios.post("/api/inquiry", {
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
    }
  );

  return (
    <div className="flex flex-col items-start justify-center max-lg:gap-10 gap-2 max-lg:w-full w-1/2 h-full">
      <div className="w-full">
        <Input
          id="email"
          type="text"
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
        <p>
          Odesláním formuláře beru na vědomí zásady zpracování osobních údajů a
          také podmínky použití.
        </p>
        <Button
          color="primary"
          onClick={() => (window.location.href = "/inquiry")}
          className="w-full"
          arrow
        >
          Odeslat poptávku
        </Button>
      </div>
    </div>
  );
};

export default InquiryForm;
