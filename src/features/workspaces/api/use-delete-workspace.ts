import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]>;

export const useDeleteWorkSpace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({param}) => {
      const response = await client.api.workspaces[":workspaceId"]["$delete"]({param});
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess: (response: ResponseType) => {
      if ("data" in response) {
        router.refresh();
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        queryClient.invalidateQueries({
            queryKey: ["workspaces", response.data.$id],
        });
        router.push('/');
        toast.success("Deleted Workspace");
      } else {
        toast.error("Failed to delete workspace");
      }
    },
    onError: () => {
      toast.error("Failed to update workspace");
    },
  });
  return mutation;
};
