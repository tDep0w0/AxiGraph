import { useQuery } from "@tanstack/react-query";
import { fetchGoogle } from "../services/google";

export const useSearchGoogle = (prompt: string) => {
  return useQuery({
    queryFn: () => fetchGoogle(prompt),
    queryKey: ["search", prompt],
    enabled: false,
  });
};
