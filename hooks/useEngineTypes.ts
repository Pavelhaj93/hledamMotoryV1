import { useQuery } from "@tanstack/react-query";
import { fetchEngineTypes } from "@/lib/api/fetchEngineTypes";
import type { EngineType } from "@prisma/client";

export function useEngineTypes(selectedModel: string) {
  return useQuery<EngineType[]>({
    queryKey: ["engineTypes", selectedModel],
    queryFn: () => fetchEngineTypes(selectedModel),
    enabled: !!selectedModel,
  });
}
