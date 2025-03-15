'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod";
import { workspaceSchema } from '../schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { DottedSeparator } from '@/components/dotted-seperator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '../api/use-createworkspace';
import { useRef } from 'react';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { ImageIcon } from 'lucide-react';

type Props = {
    onCancel?: () => void,
}

export default function CreateWorkspaceForm({onCancel}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {mutate, isPending} = useCreateWorkspace();
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues:{
        name: '',
        image: ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
        form.setValue("image", file);
    }
  };

  const onSubmit = (values: z.infer<typeof workspaceSchema>) => {
    console.log("Hello");
    const finalValue = {
        name: values.name,
        image: values.image instanceof File ? values.image : ""
    };
    mutate({form: finalValue},{
        onSuccess: () => {
            form.reset();
            // ToDo: ReDirect to new workspace
        }
    });
  }

  return (
    <>
        <Card className='w-full h-full border-none shadow-none'>
            <CardHeader className='flex p-7'>
                <CardTitle className='text-xl font-bold'>
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <div className='px-7'>
                <DottedSeparator/>
            </div>
            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-y-4'>
                            <FormField 
                            control={form.control} 
                            name='name' 
                            render={({field}) => (
                                <FormItem>
                                <FormLabel>Workspace Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    placeholder='Enter Workspace Name'/>
                                </FormControl>
                                <FormMessage></FormMessage>
                                </FormItem>
                            )}>
                            </FormField>
                            <FormField 
                            control={form.control}
                            name='image'
                            render={({field}) => (
                                <div className='flex flex-col gap-y-2'>
                                    <div className='flex items-center gap-x-5'>
                                        {
                                            field.value ? (
                                                <div className='size-[72px] rounded-md relative overflow-hidden'>
                                                    <Image 
                                                    src={
                                                        field.value instanceof File ? URL.createObjectURL(field.value) 
                                                        : field.value
                                                    }
                                                    alt='logo'
                                                    fill
                                                    className='object-cover'/>
                                                </div>
                                            ) : <>
                                                <Avatar className='size-[72px]'>
                                                    <AvatarFallback>
                                                        <ImageIcon className='size-[36px] text-neutral-400'/>
                                                    </AvatarFallback>
                                                </Avatar>
                                            </>
                                        }
                                        <div className='flex flex-col'>
                                            <p className='text-sm'>WorkSpace Icon</p>
                                            <p className='text-sm text-muted-foreground'>
                                                JPG, PNG, SVG or JPEF, max 1mb
                                            </p>
                                            <input
                                            className='hidden'
                                            type='file'
                                            accept='.jpg, .png, .jpeg, .svg'
                                            ref={inputRef}
                                            disabled={isPending}
                                            onChange={handleImageChange}
                                            />
                                            <Button
                                            disabled={isPending}
                                            type='button'
                                            variant={'secondary'}
                                            size="sm"
                                            className='w-full mt-2'
                                            onClick={() => {
                                                inputRef.current?.click()
                                            }}>
                                                Upload Image
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}>
                            </FormField>
                            <div className='flex items-center justify-between'>
                                <Button 
                                disabled={isPending}
                                type='button'
                                size={'lg'}
                                onClick={onCancel}>
                                    Cancel
                                </Button>
                                <Button 
                                type='submit'
                                disabled={isPending}
                                size={'lg'}
                                onClick={onCancel}>
                                    Create Workspace
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </>
  )
}