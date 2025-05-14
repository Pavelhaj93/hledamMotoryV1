"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import axios from "axios";
import { ChevronRight } from "lucide-react";

import { useRequestMotors } from "@/app/hooks/useRequestMotors";
import useMessage from "@/app/hooks/useMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
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
        form.reset();
        setRequestMotors([]);
        setIsSubmitting(false);
      },
    }
  );

  const onSubmit = (formValues: FormValues) => {
    setIsSubmitting(true);
    mutation.mutate(formValues);
  };

  return (
    <div className="flex flex-col items-start justify-center max-lg:gap-10 gap-2 max-lg:w-full w-1/2 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Emailová adresa"
                      type="email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Telefon"
                      type="text"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Poznámka"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <FormField
              control={form.control}
              name="acceptPrivacyPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-col my-8">
                  <div className="flex items-center gap-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="w-6 h-6 ml-6 data-[state=checked]:bg-red-600 data-[state=checked]:text-white border-gray-300 rounded"
                      />
                    </FormControl>
                    <FormLabel className="lg:text-lg text-gray-700 font-normal">
                      Souhlasím s{" "}
                      <a
                        href="/ochrana-osobnich-udaju"
                        className="text-red-600 text-lg underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        podmínkami ochrany osobních údajů
                      </a>
                    </FormLabel>
                  </div>
                  <FormMessage className="text-center mt-2" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              Odeslat poptávku
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InquiryForm;
