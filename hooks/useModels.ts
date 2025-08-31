import { useQuery } from "@tanstack/react-query";
import { fetchModels } from "@/lib/api/fetchModels";
import type { Model } from "@prisma/client";

export function useModels(selectedMark: string) {
  return useQuery<Model[]>({
    queryKey: ["models", selectedMark],
    queryFn: () => fetchModels(selectedMark),
    enabled: !!selectedMark, // Only fetch if brand is provided
  });
}
