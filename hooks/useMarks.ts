import { useQuery } from "@tanstack/react-query";
import { fetchMarks } from "@/lib/api/fetchMarks";
import type { Mark } from "@prisma/client";

export function useMarks() {
  return useQuery<Mark[]>({
    queryKey: ["marks"],
    queryFn: () => fetchMarks(),
  });
}
