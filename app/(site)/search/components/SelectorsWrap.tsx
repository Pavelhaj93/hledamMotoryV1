"use client";

import React, { FC, useState } from "react";

import { useQuery } from "react-query";
import useMessage from "@/app/hooks/useMessage";
import axios from "axios";
import { marks } from "@/public/data/marks";
import SelectorGroup from "./SelectorGroup";
import TextArea from "@/components/inputs/TextArea";


import Button from "@/components/Button";
import { useLocalStorageValue } from "@react-hookz/web";
import InquiryFooter from "./InquiryFooter";

interface SelectorsWrapProps {}

export type RequestMotor = {
  mark: string | null;
  model: string | null;
  engineType: string | null;
  textArea: string | null;
};

const SelectorsWrap: FC<SelectorsWrapProps> = () => {
  const message = useMessage();
  const { set: setRequestMotors, value: requestMotors } =
    useLocalStorageValue<RequestMotor[]>("requestMotors");

  const [selectedMark, setSelectedMark] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedEngineType, setSelectedEngineType] = useState<string | null>(
    null
  );
  const [textArea, setTextArea] = useState<string | null>(null);

  const handleSave = () => {
    setRequestMotors([
      ...(requestMotors ?? []),
      {
        mark: selectedMark,
        model: selectedModel,
        engineType: selectedEngineType,
        textArea,
      },
    ]);
    window.location.reload();
  };

  const handleSelectedMark = (itemName: string) => {
    setSelectedMark(itemName);
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

  return (
    <div className="flex flex-row max-lg:flex-col items-start justify-center gap-14 w-full h-full">
      <div className="flex flex-col items-start justify-center gap-10 max-lg:w-full w-1/2 h-full">
        <div className="w-full">
          <SelectorGroup
            data={marks ?? []}
            title={selectedMark ?? "Značka"}
            selected={!!selectedMark}
            onSelected={handleSelectedMark}
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
            placeHolder="Upřesněte vybráný motor, nejlépe označení motoru"
            textCenter="left"
            id="textArea"
            setValue={setTextArea}
            disabled={!selectedEngineType || !selectedMark || !selectedModel}
          />
        </div>
        <div className="flex flex-row max-md:flex-col max-md:gap-0 gap-4 w-full">
          <Button arrow color="primary" className="w-full mb-4">
            Poptat motory
          </Button>
          <Button
            color="secondary"
            className="w-full"
            onClick={handleSave}
            disabled={
              !selectedMark ||
              !selectedModel ||
              !selectedEngineType ||
              !textArea
            }
          >
            Uložit a hledat další
          </Button>
        </div>
      </div>
      <InquiryFooter
        selectedMark={selectedMark}
        selectedModel={selectedModel}
        selectedEngineType={selectedEngineType}
      />
    </div>
  );
};

export default SelectorsWrap;
