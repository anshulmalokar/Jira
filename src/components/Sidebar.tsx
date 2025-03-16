import { DottedSeparator } from '@/components/dotted-seperator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navigation from './Navigation'
import WorkspaceSwitcher from './WorkspaceSwitcher'

type Props = {}

export default function Sidebar({}: Props) {
  return (
    <aside className='h-full bg-neutral-100 p-4 w-full'>
        <Link href={"/"}>
            <Image src='/logo.svg' alt='logo' width={60} height={30}/>
        </Link>
        <DottedSeparator className='my-4'/>
        <WorkspaceSwitcher/>
        <DottedSeparator className='my-5'/>
        <Navigation/>
    </aside>
  )
}