"use client";

import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useMessage from "@/app/hooks/useMessage";

const LoginForm = () => {
  const message = useMessage();
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          message.error(res.error);
        }

        if (res?.ok && !res?.error) {
          message.success("Logged in successfully");
          router.push("/admin");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const testRegister = () => {
  //   setIsLoading(true);

  //   axios.post("/api/register", {
  //     email: "pavelhajduch93@gmail.com",
  //     password: "Hajtolomej123",
  //   });
  // };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {session.status !== "authenticated" ? (
            <>
              <Input
                id="email"
                label="email"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            </>
          ) : (
            <div>You are logged in</div>
          )}
          {session.status !== "authenticated" && (
            <div>
              <Button disabled={isLoading} fullWidth type="submit">
                Sign in
              </Button>
              {/* <Button
                onClick={handleSubmit(testRegister)}
                disabled={isLoading}
                fullWidth
                type="button"
              >
                Test register
              </Button> */}
            </div>
          )}
        </form>
        {session.status === "authenticated" && (
          <Button onClick={() => router.push("/admin")}>
            Go to admin page
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
