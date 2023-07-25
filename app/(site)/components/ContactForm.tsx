"use client";

import useMessage from "@/app/hooks/useMessage";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("Zadejte jméno"),
  email: z.string().nonempty("Zadejte email"),
  message: z.string().nonempty("Zadejte zprávu"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  motorId?: string;
  motorName?: string;
}

const ContactForm: FC<ContactFormProps> = ({ motorId, motorName }) => {
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
      const { data } = await axios.post(
        motorId ? `/api/contact/${motorId}` : "/api/contact",
        {
          ...formValues,
        }
      );

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

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    mutation.mutate(formValues);
  };

  return (
    <div className="max-lg:w-full w-1/2">
      <h3 className="max-lg:text-center max-lg:mb-7 mb-9 mt-5 font-bold text-2xl">
        Nebo nám napište
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
            defaultValue={
              motorId &&
              motorName &&
              "Zajímá mě motor " + motorName + " (ID: " + motorId + ")"
            }
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
