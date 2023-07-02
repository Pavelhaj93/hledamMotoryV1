"use client";

import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("Zadejte jméno"),
  email: z.string().nonempty("Zadejte email"),
  message: z.string().nonempty("Zadejte zprávu"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation(async (formValues: FormValues) => {
    const { data } = await axios.post(`/api/contact`, {
      ...formValues,
    });

    return data;
  });

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    mutation.mutate(formValues);
  };

  return (
    <div className="max-lg:w-full w-1/2">
      <h3 className="max-lg:text-center max-lg:mb-7 mb-9 mt-5 font-bold text-2xl">
        Kontaktujte nás
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
            className="h-32"
          />
          <Button
            className="max-lg:w-full w-1/2 ml-0"
            type="submit"
            disabled={mutation.isLoading || isSubmitting}
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
