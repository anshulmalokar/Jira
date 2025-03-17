import SingUpCard from '@/features/auth/components/SingUpCard'
import { getCurrent } from '@/features/auth/server/quries';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export default async function page({}: Props) {
  const user = await getCurrent();
  if(user){
    redirect('/');
  }
  return (
    <div>
      <SingUpCard/>
    </div>
  )
}