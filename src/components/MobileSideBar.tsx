'use client'
import React, { useEffect, useState } from 'react'
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import Sidebar from './Sidebar'
import { usePathname } from 'next/navigation'
type Props = {}

export default function MobileSideBar({}: Props) {
  const[open,isOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    isOpen(false);
  },[])

  return (
    <>
      <Sheet modal={false} open={open} onOpenChange={isOpen }>
        <SheetTrigger asChild>
          <Button size={"icon"} className='lg:hidden'>
            <MenuIcon className='text-neutral-500 '/>  
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className='p-0'>
          <Sidebar/>
        </SheetContent>
      </Sheet>
    </>
  )
}