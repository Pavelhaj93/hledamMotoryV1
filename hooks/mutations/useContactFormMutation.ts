import useMessage from "@/app/hooks";
import { useMutation } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  message: string;
  motorVariant?: string;
}

interface UseContactFormProps {
  motorId?: string;
  motorSlug?: string;
  motorName?: string;
  motorVariant?: string;
  form: UseFormReturn<
    {
      name: string;
      email: string;
      message: string;
      acceptPrivacyPolicy: true;
      motorVariant?: string | undefined;
    },
    // biome-ignore lint/suspicious/noExplicitAny: its ok
    any,
    {
      name: string;
      email: string;
      message: string;
      acceptPrivacyPolicy: true;
      motorVariant?: string | undefined;
    }
  >;
}

export function useContactFormMutation({
  motorId,
  motorSlug,
  motorName,
  motorVariant,
  form,
}: UseContactFormProps) {
  const message = useMessage();
  return useMutation({
    mutationFn: async (formValues: FormValues) => {
      const response = await fetch(
        motorId ? `/api/contact/${motorSlug}` : "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      return response.json();
    },
    onError: () => {
      message.error("Při odesílání zprávy došlo k chybě");
    },
    onSuccess: () => {
      message.success("Zpráva byla úspěšně odeslána");
      form.reset({
        name: "",
        email: "",
        message: motorName ? `Mám zájem o motor ${motorName}` : "",
        motorVariant,
      });
    },
  });
}
