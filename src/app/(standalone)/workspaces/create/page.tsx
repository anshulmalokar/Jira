import { getCurrent } from '@/features/auth/server/action';
import CreateWorkspaceForm from '@/features/workspaces/components/CreateWorkspaceForm'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export default async function page({}: Props) {
  const user = await getCurrent();
      if(!user){
        redirect('/sign-in')
      }
  return (
    <div className='w-full lg:max-w-xl'>
        <CreateWorkspaceForm/>
    </div>
  )
}