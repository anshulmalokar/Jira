import { Loader } from 'lucide-react'
import React from 'react'

type Props = {}

export default function loading({}: Props) {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Loader className='size-9 animate-ping text-muted-foreground'/>
    </div>
  )
}