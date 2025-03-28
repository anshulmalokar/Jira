'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  const pathName = usePathname();
  return (
    <main className='bg-neutral-100 min-h-screen'>
        <div className='mx-auto max-w-screen-2xl p-4'>
            <nav className='flex justify-between items-center'>
                <Image src='/logo.svg' height={50} width={80} alt='logo'/>
                <Button size={'lg'} asChild>
                    <Link href={ pathName === '/sign-up' ? '/sign-in' : '/sign-up'}>
                    {
                        pathName === '/sign-up' ? 'SingUp' : 'Login'
                    }
                    </Link>
                </Button>
            </nav>
            <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
                {children}
            </div>
        </div>
    </main>
  )
}