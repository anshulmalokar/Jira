'use client'
import ResponsiveModel from "@/components/ResponsiveModel";
import CreateWorkspaceForm from "./CreateWorkspaceForm";

import React from 'react'
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-model";

type Props = {}

export default function CreateWorkSpaceMode({}: Props) {
  const {isOpen, setIsOpen,close}  = useCreateWorkspaceModal();
  return (
    <>
        <ResponsiveModel open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close}/>
        </ResponsiveModel>
    </>
  )
}