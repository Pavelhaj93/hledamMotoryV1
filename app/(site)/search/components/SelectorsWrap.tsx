"use client";

import React, { FC, useContext } from "react";

import { useQuery } from "react-query";
import useMessage from "@/app/hooks/useMessage";
import axios from "axios";
import { marks } from "@/public/data/marks";
import SelectorGroup from "./SelectorGroup";
import TextArea from "@/components/inputs/TextArea";
import Button from "@/components/Button";
import InquiryFooter from "./InquiryFooter";
import { InquiryContext } from "@/app/context/InquiryContext";
import { useRequestMotors } from "@/app/hooks/useRequestMotors";

interface SelectorsWrapProps {}

const SelectorsWrap: FC<SelectorsWrapProps> = () => {
  const message = useMessage();
  const {
    handleSelectedMark,
    handleSelectedModel,
    textArea,
    selectedMark,
    selectedModel,
    selectedEngineType,
    setSelectedEngineType,
    setTextArea,
  } = useContext(InquiryContext);
  const { setRequestMotors, requestMotors } = useRequestMotors();

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

  const models = useQuery(
    ["models", selectedMark],
    async () => {
      const { data } = await axios.post(`/api/models/${selectedMark}`);
      return data;
    },
    {
      enabled: !!selectedMark,
      onError: () => {
        message.error("Models fetching failed");
      },
    }
  );

  const engineTypes = useQuery(
    ["engineTypes", selectedModel],
    async () => {
      const { data } = await axios.post(`/api/engineTypes/${selectedModel}`);
      return data;
    },
    {
      enabled: !!selectedModel,
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
            first
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
            rounded
            placeholder="Upřesněte vybráný motor, nejlépe označení motoru"
            textCenter="left"
            id="textArea"
            setValue={setTextArea}
            disabled={!selectedEngineType || !selectedMark || !selectedModel}
          />
        </div>
        <div className="flex flex-col md:max-lg:flex-row max-md:gap-0 gap-4 w-full">
          <Button
            arrow
            color="primary"
            className="w-full mb-4 md:max=lg:w-1/2"
            onClick={() => (window.location.href = "/inquiry")}
          >
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
      <InquiryFooter />
    </div>
  );
};

export default SelectorsWrap;
