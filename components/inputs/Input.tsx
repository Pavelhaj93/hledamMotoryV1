"use client";

import clsx from "clsx";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import React, { FC } from "react";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  error: FieldError | undefined;
  disabled?: boolean;
  className?: string;
}

const Input: FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  error,
  disabled,
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
          placeholder={label}
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
            placeholder:opacity-0
            placeholder:max-lg:opacity-100
            placeholder:text-center
            max-lg:focus:ring-1
            max-lg:focus:ring-gray-300
            focus:ring-0
            text-lg
            sm:leading-6
          `,
            error && "focus:ring-rose500",
            disabled && "opacity-50 cursor-default",
            className
          )}
        />
        {error && (
          <span className="text-red-500 text-sm max-lg:text-center">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
