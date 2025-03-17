import React from 'react'
import EditWorkSpace from '@/features/workspaces/components/EditWorkspaceFrom'
import { getCurrent } from '@/features/auth/server/quries'
import { redirect } from 'next/navigation';
import { getWorkSpace } from '@/features/workspaces/quries';

type Props = {
    params: {
        workspaceId: string
    }
}

export default async function page({params}: Props) {
  const user = await getCurrent();
  if(!user){
    redirect('/sign-in');
  }
  const initialValues = await getWorkSpace({workspaceId: params.workspaceId});
  if(!initialValues){
    redirect(`/workspaces/${params.workspaceId}`)
  }
  return (
    <div className='w-full lg:max-w-xl'>
        <EditWorkSpace initialValues={initialValues}/>
    </div>
  )
}