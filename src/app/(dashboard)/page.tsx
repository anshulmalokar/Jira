import { UserBtn } from "@/features/auth/components/UserBtn";
import { getCurrent } from "@/features/auth/server/quries";
import { getWorkSpaces } from "@/features/workspaces/quries";
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