"use client";

import clsx from "clsx";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

import React, { FC } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
  textCenter?: "left" | "center" | "right";
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  id,
  type,
  required,
  register,
  error,
  disabled,
  rounded,
  textCenter = "left",
  className,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xl font-normal mb-7 leading-6 text-gray-700 max-lg:hidden"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          placeholder={placeholder ?? label}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
          form-input
          block 
            w-full
            max-lg:rounded-md
            h-14
            border-0
            mb-5
            py-1.5
            bg-gray-50
            text-gray-900
            shadow-sm                        
            placeholder:text-gray-400
            placeholder:max-lg:opacity-100
            placeholder:${textCenter}
            max-lg:focus:ring-1
            max-lg:focus:ring-gray-300
            focus:ring-0
            text-lg
            sm:leading-6
          `,
            !placeholder && "placeholder-opacity-0",
            error && "focus:ring-rose500",
            disabled && "opacity-50 cursor-default",
            rounded && "rounded-md border-2 border-solid",
            className
          )}
        />
        {error && (
          <span className="text-red-500 text-sm max-lg:text-center">
            {error.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
