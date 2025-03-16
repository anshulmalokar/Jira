'use client'
import { useGetWorkspaces } from '@/features/workspaces/api/use-getWorspaces'
import React from 'react'
import {RiAddCircleFill}  from "react-icons/ri";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import WorkspaceAvatar from '@/features/workspaces/components/WorkspaceAvatar';
import { useRouter } from 'next/navigation';
import { useWorkSpaceId } from '@/features/workspaces/hooks/use-workspaceid';
type Props = {}

export default function WorkspaceSwitcher({}: Props) {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  }
  const {data: workspaces} = useGetWorkspaces();
  return (
    <div className='flex flex-col gap-y-2'>
        <div className='flex items-center justify-between'>
            <p className='text-xs uppercase text-neutral-500'>Workspaces</p>
            <RiAddCircleFill className='size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition'/>
        </div>
        <Select onValueChange={onSelect} value={workspaceId}>
            <SelectTrigger className='w-full bg-neutral-200 p-1 font-medium'>
                <SelectValue placeholder='No workspace selected'/>
                <SelectContent>
                    {
                        // @ts-ignore
                      workspaces?.total > 0 &&  workspaces?.documents.map((workspace) => {
                            return <>
                                <SelectItem key={workspace.$id} value={workspace.$id}>
                                    <div className='flex justify-start items-center gap-2 font-medium'>
                                        <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl}/>
                                        <p className='truncate'>{workspace.name}</p>
                                    </div>
                                </SelectItem>
                            </>
                        })
                    }
                </SelectContent>
            </SelectTrigger>
        </Select>
    </div>
  )
}