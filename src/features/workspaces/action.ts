"use server"
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { AUTH_COOKIE } from "@/lib/constants";
import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { getMember } from "../members/utils";
import { Workspace } from "./types";

export const getWorkSpaces = async() => {
    try{
        const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
        const session = cookies().get(AUTH_COOKIE);
        if(!session) return {
            document: [],
            total: 0
          };
        client.setSession(session.value);
        const account = new Account(client);
        const databases = new Databases(client);
        const user = await account.get();
        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal('userId', user.$id)]
           );
           if(members.total == 0) {
            return {
                document: [],
                total: 0
              }
           };
           const workspaceIds = members.documents.map(m => m.workspaceId);
           const workspaces = await databases.listDocuments(
                   DATABASE_ID, 
                   WORKSPACE_ID,
                   [ 
                     Query.orderDesc('$createdAt'),
                     Query.contains('$id', workspaceIds)
                   ]
                 );
        return workspaces;
    }catch(e){
        console.log(e);
        return {
            document: [],
            total: 0
          }
    }
}

type GetWorkSpaceProps = {
  workspaceId: string
}

export const getWorkSpace = async({workspaceId}: GetWorkSpaceProps) => {
  try{
      const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
      const session = cookies().get(AUTH_COOKIE);
      if(!session) return null;
      client.setSession(session.value);
      const account = new Account(client);
      const databases = new Databases(client);
      const user = await account.get();
      const member = await getMember({
        databases: databases,
        workspaceId: workspaceId,
        userId: user.$id,
      });
      if(!member) return null;
      const workspace = await databases.getDocument<Workspace>(
              DATABASE_ID, 
              WORKSPACE_ID,
              workspaceId,
      );
    return workspace;
  }catch(e){
      console.log(e);
      return null;
  }
}