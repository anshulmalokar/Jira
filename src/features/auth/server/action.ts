"use server"
import { AUTH_COOKIE } from "@/lib/constants";
import { cookies } from "next/headers";
import { Client, Account } from "node-appwrite";

export const getCurrent = async() => {
    try{
        const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
        const session = cookies().get(AUTH_COOKIE);
        if(!session) return null;
        client.setSession(session.value);
        const account = new Account(client);
        const user = await account.get();
        return user;
    }catch(e){
        console.log(e);
        return null;
    }
}