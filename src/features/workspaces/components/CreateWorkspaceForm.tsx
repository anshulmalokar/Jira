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

type Props = {
    onCancel?: () => void,
}

export default function CreateWorkspaceForm({onCancel}: Props) {
  const {mutate, isPending} = useCreateWorkspace();
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues:{
        name: '',
    }
  });

  const onSubmit = (values: z.infer<typeof workspaceSchema>) => {
    mutate({json: values});
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
                            <div className='flex items-center justify-between'>
                                <Button 
                                disabled={isPending}
                                type='button'
                                size={'lg'}
                                onClick={onCancel}>
                                    Cancel
                                </Button>
                                <Button 
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