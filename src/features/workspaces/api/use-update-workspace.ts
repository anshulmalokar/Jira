import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { SuccessStatusCode } from "hono/utils/http-status";
import { useRouter } from "next/navigation";

type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"],
  SuccessStatusCode
>;

export const useUpdateWorkSpace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({
        form,
        param,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess: (response: ResponseType) => {
      if ("data" in response) {
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        queryClient.invalidateQueries({
          queryKey: ["workspaces", response.data.$id],
        });
        router.push(`/workspaces/${response.data.$id}`)
        toast.success("Updated Workspace");
      } else {
        toast.error(response.error || "Failed to update workspace");
      }
    },
    onError: () => {
      toast.error("Failed to update workspace");
    },
  });
  return mutation;
};
