"use client";

import React, { FC, useState } from "react";

import { useQuery } from "react-query";
import useMessage from "@/app/hooks/useMessage";
import axios from "axios";
import { marks } from "@/public/data/marks";
import SelectorGroup from "./SelectorGroup";
import TextArea from "@/components/inputs/TextArea";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { useLocalStorageValue } from "@react-hookz/web";
import { EngineType, Mark, Model } from "@prisma/client";

interface SelectorsWrapProps {}

const formSchema = z.object({
  mark: z.string(),
  model: z.string(),
  engineType: z.string(),
  textArea: z.string(),
});

const SelectorsWrap: FC<SelectorsWrapProps> = () => {
  const message = useMessage();
  const {
    set: setProgressMotor,
    value: progressMotor,
    remove,
  } = useLocalStorageValue<{
    mark: string | undefined;
    model: string | undefined;
    engineType: string | undefined;
  }>("progressMotor", {
    defaultValue: {
      mark: "",
      model: "",
      engineType: "",
    },
  });

  const [selectedMark, setSelectedMark] = useState<string | null>(
    progressMotor?.mark ?? null
  );
  const [selectedModel, setSelectedModel] = useState<string | null>(
    progressMotor?.model ?? null
  );
  const [selectedEngineType, setSelectedEngineType] = useState<string | null>(
    progressMotor?.engineType ?? null
  );

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const handleSelectedMark = (itemName: string) => {
    setSelectedMark(itemName);
    setProgressMotor({ ...progressMotor, mark: itemName });
    if (selectedMark !== itemName) {
      setSelectedModel(null);
      setSelectedEngineType(null);
    }
  };

  const handleSelectedModel = (itemName: string) => {
    setSelectedModel(itemName);
    if (selectedModel !== itemName) {
      setSelectedEngineType(null);
    }
  };

  const models = useQuery(
    ["models", selectedMark],
    async () => {
      const { data } = await axios.post(`/api/models/${selectedMark}`);
      return data;
    },
    {
      enabled: !!selectedMark,
      onSuccess: () => {
        message.success("Models fetched successfully");
      },
      onError: () => {
        message.error("Models fetching failed");
      },
    }
  );

  console.log("selectedMark", selectedMark);

  const engineTypes = useQuery(
    ["engineTypes", selectedModel],
    async () => {
      const { data } = await axios.post(`/api/engineTypes/${selectedModel}`);
      return data;
    },
    {
      enabled: !!selectedModel,
      onSuccess: () => {
        message.success("Engine types fetched successfully");
      },
      onError: () => {
        message.error("Engine types fetching failed");
      },
    }
  );

  // console.log("marks", marks);
  console.log("models", models);
  // console.log("selectedMark", selectedMark);

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full">
      <div className="w-full">
        <SelectorGroup
          data={marks ?? []}
          title={selectedMark ?? "Značka"}
          selected={!!selectedMark}
          onSelected={handleSelectedMark}
          onSelectedModel={setSelectedModel}
        />
      </div>
      <div className="w-full">
        <SelectorGroup
          data={models.data ?? []}
          title={selectedModel ?? "Model"}
          selected={!!selectedModel}
          onSelected={handleSelectedModel}
          disabled={!selectedMark}
        />
      </div>
      <div className="w-full">
        <SelectorGroup
          data={engineTypes.data ?? []}
          title={selectedEngineType ?? "Motorizace"}
          selected={!!selectedEngineType}
          onSelected={setSelectedEngineType}
          disabled={!selectedModel}
        />
      </div>
      <div className="w-full">
        <TextArea
          className="border-2 border-solid rounded-md border-gray-500 h-40 outline-none"
          label="Upřesněte vybráný motor, nejlépe označení motoru"
          textCenter="left"
          id="textArea"
          register={register}
          errors={errors.textArea}
          disabled={!selectedEngineType || !selectedMark || !selectedModel}
        />
      </div>
      <div className="flex flex-row max-md:flex-col max-md:gap-0 gap-4 w-full">
        <Button arrow color="primary" className="w-full mb-4">
          Poptat motory
        </Button>
        <Button color="secondary" className="w-full">
          Uložit a hledat další
        </Button>
      </div>
    </div>
  );
};

export default SelectorsWrap;
