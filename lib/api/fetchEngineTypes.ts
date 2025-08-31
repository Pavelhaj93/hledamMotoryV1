import axios from "axios";

export const fetchEngineTypes = async (selectedModel: string) => {
  const { data } = await axios.get(`/api/engineTypes/${selectedModel}`);
  return data;
};
