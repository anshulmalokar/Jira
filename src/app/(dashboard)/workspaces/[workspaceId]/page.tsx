import { getCurrent } from '@/features/auth/server/quries';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export default async function page({}: Props) {
  const user = await getCurrent();
    if(!user){
      redirect('/sign-in')
    }
  return (
    <div>page</div>
  )
}