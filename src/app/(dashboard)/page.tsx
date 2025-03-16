import { UserBtn } from "@/features/auth/components/UserBtn";
import { getCurrent } from "@/features/auth/server/action";
import { getWorkSpaces } from "@/features/workspaces/action";
import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if(!user){
    redirect('/sign-in')
  }
  const workspaces = await getWorkSpaces();
  if(workspaces.total === 0){
    redirect('/workspaces/create')
  }else{
    // @ts-ignore
    redirect(`/workspaces/${workspaces?.documents[0].$id}`)
  }
}