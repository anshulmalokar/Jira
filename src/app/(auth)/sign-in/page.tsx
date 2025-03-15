import SingInCard from '@/features/auth/components/SingInCard'
import { getCurrent } from '@/features/auth/server/action'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export default async function page({}: Props) {
  const user = await getCurrent();
  if(user){
    redirect('/');
  }
  return (
    <SingInCard/>
  )
}