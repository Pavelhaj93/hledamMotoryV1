"use client";

import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

interface InquiryContextProps extends PropsWithChildren {
  selectedMark: string | null;
  setSelectedMark: (mark: string | null) => void;
  selectedModel: string | null;
  setSelectedModel: (model: string | null) => void;
  selectedEngineType: string | null;
  setSelectedEngineType: (engineType: string | null) => void;
  textArea: string | null;
  setTextArea: (textArea: string | null) => void;
  handleSelectedMark: (itemName: string) => void;
  handleSelectedModel: (itemName: string) => void;
}

export const InquiryContext = createContext<InquiryContextProps>({
  selectedMark: null,
  setSelectedMark: () => {},
  selectedModel: null,
  setSelectedModel: () => {},
  selectedEngineType: null,
  setSelectedEngineType: () => {},
  textArea: null,
  setTextArea: () => {},
  handleSelectedMark: () => {},
  handleSelectedModel: () => {},
});

InquiryContext.displayName = "InquiryContext";

export const InquiryContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedMark, setSelectedMark] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedEngineType, setSelectedEngineType] = useState<string | null>(
    null
  );
  const [textArea, setTextArea] = useState<string | null>(null);

  const handleSelectedMark = useCallback(
    (itemName: string) => {
      setSelectedMark(itemName);
      if (selectedMark !== itemName) {
        setSelectedModel(null);
        setSelectedEngineType(null);
      }
    },
    [selectedMark]
  );

  const handleSelectedModel = useCallback(
    (itemName: string) => {
      setSelectedModel(itemName);
      if (selectedModel !== itemName) {
        setSelectedEngineType(null);
      }
    },
    [selectedModel]
  );

  const value = useMemo(
    () => ({
      selectedMark,
      setSelectedMark,
      selectedModel,
      setSelectedModel,
      selectedEngineType,
      setSelectedEngineType,
      handleSelectedMark,
      handleSelectedModel,
      textArea,
      setTextArea,
    }),
    [
      selectedMark,
      selectedModel,
      selectedEngineType,
      textArea,
      handleSelectedMark,
      handleSelectedModel,
    ]
  );

  return (
    <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
  );
};

// Path: app/context/InquiryContext.tsx
