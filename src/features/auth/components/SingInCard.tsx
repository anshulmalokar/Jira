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
import { loginSchema } from '@/app/(auth)/schema'
import { useLogin } from '../api/use-login'

type Props = {}

export default function SingInCard({}: Props) {
  
  const {mutate} = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:"",
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const req = {json: values};
    console.log(req);
    mutate(req);
  }

  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Welcome Back</CardTitle>
      </CardHeader>
      <div className='px-7'>
        <DottedSeparator/>
      </div>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
            disabled={false}
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
        <Button disabled={false}
        size={"lg"}
        className='w-full'>
          <FaGoogle className='mr-2'/> Login with Google
        </Button>
      </CardContent>
      <CardContent className='flex flex-col gap-y-4'>
        <Button disabled={false}
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
          Don't have an account <Link href='/sign-up'>
          <span className='text-blue-400'>SingUp</span></Link>
        </p>
      </CardContent>
    </Card>
  )
}