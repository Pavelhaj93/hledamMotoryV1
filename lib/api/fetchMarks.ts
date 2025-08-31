import axios from "axios";

export const fetchMarks = async () => {
  const { data } = await axios.get("/api/marks");
  return data;
};
