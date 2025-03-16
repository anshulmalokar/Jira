import React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  image?: string
  name: string
  className?: string
}

export default function WorkspaceAvatar({ image, name, className }: Props) {
  return (
    <Avatar className={cn('size-7', className)}>
      {image ? (
        <AvatarImage src={image} alt={name} />
      ) : (
        <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase">
          {name[0]}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
