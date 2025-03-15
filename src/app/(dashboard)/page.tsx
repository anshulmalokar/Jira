import { UserBtn } from "@/features/auth/components/UserBtn";
import { getCurrent } from "@/features/auth/server/action";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if(!user){
    redirect('/sign-in')
  }
  return (
    <>
       This is a home page
    </>
  );
}