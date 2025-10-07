"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useMessage from "@/app/hooks/useMessage";
import { useContactFormMutation } from "@/hooks/mutations/useContactFormMutation";

const formSchema = z.object({
  name: z.string().nonempty("Zadejte jméno"),
  email: z.string().email("Zadejte platný email").nonempty("Zadejte email"),
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

const ContactForm = ({
  motorId,
  motorName,
  motorSlug,
  motorVariant = "",
}: ContactFormProps) => {
  const message = useMessage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: motorName ? `Mám zájem o motor ${motorName}` : "",
      motorVariant,
    },
  });

  const mutation = useContactFormMutation({
    motorId,
    motorSlug,
    motorName,
    motorVariant,
    form,
  });

  const onSubmit = (formValues: FormValues) => {
    console.log("Form submitted:", formValues);
    mutation.mutate(formValues);
    message.success("Zpráva byla úspěšně odeslána. Ozveme se Vám co nejdříve.");
  };

  return (
    <div className="w-full max-lg:w-full max-w-xl">
      <h3 className="text-2xl font-bold mb-9 max-lg:mb-7 max-lg:text-center mt-5">
        Nebo využijte náš formulář a my se vám ozveme
      </h3>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno a příjmení</FormLabel>
                <FormControl>
                  <Input placeholder="Zadejte jméno a příjmení" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Váš email</FormLabel>
                <FormControl>
                  <Input placeholder="Zadejte email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zpráva</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Zadejte zprávu"
                    className="h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptPrivacyPolicy"
            render={({ field }) => (
              <FormItem className="space-y-2 my-6">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      id="acceptPrivacyPolicy"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="acceptPrivacyPolicy"
                    className="text-muted-foreground font-normal cursor-pointer"
                  >
                    Souhlasím s{" "}
                    <Link
                      href="/ochrana-osobnich-udaju"
                      className="underline text-red-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      podmínkami ochrany osobních údajů
                    </Link>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-1/2 max-lg:w-full"
          >
            Odeslat
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
