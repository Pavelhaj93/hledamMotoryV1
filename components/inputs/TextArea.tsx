"use client";

import clsx from "clsx";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

import React, { FC } from "react";

interface TextAreaProps {
  label?: string;
  id: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  textCenter: "left" | "center" | "right";
  setValue?: (e: any) => void;
  placeholder?: string;
  rounded?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  id,
  required,
  register,
  error,
  disabled,
  className,
  defaultValue,
  textCenter = "center",
  setValue,
  placeholder,
  rounded,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-xl font-normal mb-7 leading-6 text-gray-700 max-lg:hidden"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <textarea
          id={id}
          onChange={(e) => setValue?.(e.target.value)}
          defaultValue={defaultValue}
          placeholder={placeholder ?? label}
          autoComplete={id}
          disabled={disabled}
          {...register?.(id, { required })}
          className={clsx(
            `
            block 
            w-full
            max-lg:rounded-md
            h-14
            border-0
            mb-5
            py-4
            px-5
            bg-gray-50
            text-gray-900
            shadow-sm                        
            placeholder:text-gray-400
            placeholder:max-lg:opacity-100
            placeholder:text-${textCenter}
            max-lg:focus:ring-1
            max-lg:focus:ring-gray-300
            focus:ring-0
            text-lg
            sm:leading-6
            outline-none
          `,
            !placeholder && "placeholder-opacity-0",
            error && "focus:ring-rose500",
            disabled && "opacity-30 cursor-default",
            rounded &&
              "border-2 border-solid rounded-md border-gray-500 h-40 outline-none",
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

export default TextArea;
