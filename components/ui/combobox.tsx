"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "../extensions/spinner";

type ComboboxProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  required?: boolean;
  disabled?: boolean;
  withImage?: boolean;
  isLoading?: boolean;
};

export default function Combobox({
  options,
  value,
  onChange,
  placeholder,
  emptyMessage,
  required = false,
  disabled = false,
  withImage = false,
  isLoading = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options?.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <button> is not a combobox
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between border-gray-300 bg-white hover:bg-gray-50 text-left font-normal",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {value ? selectedOption?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[718px] p-0">
        <Command>
          {/* TODO: add placeholder */}
          <CommandInput placeholder={"Hledat..."} className="h-9" />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Spinner />
                </div>
              ) : (
                emptyMessage
              )}
            </CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options?.map((option, index) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {withImage && (
                    <Image
                      src={`/images/frontend/cars/PNG/${index + 1}.png`}
                      alt={option.label}
                      width={20}
                      height={20}
                      className="mr-2 h-10 w-10 object-cover"
                    />
                  )}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
