'use client'
import { cn } from '@/lib/utils'
import { SettingsIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go"
import { useWorkSpaceId } from '@/features/workspaces/hooks/use-workspaceid'
import { usePathname } from 'next/navigation'

type Props = {}
const routes = [
    {
        label: "Home",
        href: "/",
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon
    },
    {
        label: "Members",
        href: "/members",
        icon: UsersIcon,
        activeIcon: UsersIcon
    }
]

export default function Navigation({}: Props) {
  const workspaceId = useWorkSpaceId();
  const pathname = usePathname();

  return (
    <ul>
        {
            routes.map((item) => {
                    const fullHref = `/workspaces/${workspaceId}${item.href}`;
                    const isActive = pathname === fullHref;
                    const Icon = isActive ? item.activeIcon : item.icon;
                    return (<>
                        <Link  key={item.href} href={fullHref}>
                            <div className= {cn(
                                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}>
                                <Icon className='size-5 text-neutral-500'/>
                                {item.label}
                            </div>
                        </Link>
                    </>)
                }
            )
        }
    </ul>
  )
}