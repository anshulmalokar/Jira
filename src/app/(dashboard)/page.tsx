import { UserBtn } from "@/features/auth/components/UserBtn";
import { getCurrent } from "@/features/auth/server/action";
import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if(!user){
    redirect('/sign-in')
  }
  return (
    <>
      <div className="border p-4 h-full">
         <CreateWorkspaceForm/>
      </div>
    </>
  );
}