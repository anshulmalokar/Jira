import { UserBtn } from '@/features/auth/components/UserBtn'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <main className='bg-neutral-100 min-h-screen'>
        <div className='mx-auto max-w-screen-2xl p-4'>
            <nav className='flex justify-between items-center h-[73px]'>
                <Link href={'/'}>
                    <Image src={'/logo.svg'} width={60} height={60} alt='logo'/>
                </Link>
                <UserBtn/>
            </nav>
            <div className='flex flex-col items-center justify-center py-4'>
                {children}
            </div>
        </div>
    </main>
  )
}