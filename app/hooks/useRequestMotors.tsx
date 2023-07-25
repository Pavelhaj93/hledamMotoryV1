import { useLocalStorageValue } from "@react-hookz/web";

export type RequestMotor = {
  mark: string | null;
  model: string | null;
  engineType: string | null;
  textArea: string | null;
};

export const useRequestMotors = () => {
  const { set: setRequestMotors, value: requestMotors } =
    useLocalStorageValue<RequestMotor[]>("requestMotors");

  const handleDeleteMotor = (index: number) => {
    return () => {
      const newRequestMotors = requestMotors?.filter(
        (_, motorIndex) => motorIndex !== index
      );
      if (newRequestMotors) setRequestMotors(newRequestMotors);
    };
  };

  return { setRequestMotors, requestMotors, handleDeleteMotor };
};
