'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DottedSeparator } from '@/components/dotted-seperator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Link from 'next/link'
import { formSchema } from '@/app/(auth)/schema'
import { useSignUp } from '../api/use-signup'

type Props = {}

export default function SingUpCard({}: Props) {
  
  const {mutate, isPending} = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({json: values});
  }

  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>SignUp</CardTitle>
      </CardHeader>
      <div className='px-7'>
        <DottedSeparator/>
      </div>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
             name='name'
             control={form.control}
             render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input 
                  {...field}
                  type='name' 
                  placeholder='Enter name'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
             name='email'
             control={form.control}
             render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input 
                  {...field}
                  type='email' 
                  placeholder='Enter email address'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
             name='password'
             control={form.control}
             render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input 
                  {...field}
                  type='password' 
                  placeholder='Enter password' 
                />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <Button
            disabled={isPending}
            size={"lg"}
            className='w-full'>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator/>
      </div>
      <CardContent className='p-7 flex flex-col gap-y-4'>
        <Button disabled={isPending}
        size={"lg"}
        className='w-full'>
          <FaGoogle className='mr-2'/> Login with Google
        </Button>
      </CardContent>
      <CardContent className='flex flex-col gap-y-4'>
        <Button disabled={isPending}
        size={"lg"}
        className='w-full'>
          <FaGithub className='mr-2'/> Login with Facebook
        </Button>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator/>
      </div>
      <CardContent className='p-7 flex items-center justify-center'>
        <p>
          Already have an account <Link href='/sign-in'>
          <span className='text-blue-400'>SignIn</span></Link>
        </p>
      </CardContent>
    </Card>
  )
}