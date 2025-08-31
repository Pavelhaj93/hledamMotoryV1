import axios from "axios";

export const fetchModels = async (selectedMark: string) => {
  const { data } = await axios.get(`/api/models/${selectedMark}`);
  return data;
};
