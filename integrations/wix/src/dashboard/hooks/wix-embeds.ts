import { embeddedScripts } from "@wix/app-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_EMBEDS = "rapidactEmbed";

export const useEmbeds = <T extends Record<string, string>>() => {
  const queryClient = useQueryClient();

  const getEmbeddedScript = useQuery<unknown, unknown, T>({
    queryKey: [QUERY_EMBEDS],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const embeddedScript = await embeddedScripts.getEmbeddedScript();
      return (embeddedScript.parameters || {}) as T;
    },
  });

  const embedScript = useMutation<unknown, unknown, T>({
    mutationFn: async (parameters) => {
      await embeddedScripts.embedScript({ parameters });
      return parameters;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_EMBEDS], data);
    },
  });

  return { embedScript, getEmbeddedScript };
};
