"use client"

import React from 'react'

import { credentialsLogin } from '@/lib/login';

import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';



const LoginForm = () => {
    const router = useRouter()
  return (
    <div>
         <form action={async(formData)=>{
const email = formData.get('email') ;
const password = formData.get('password')

if (!email || !password)  return toast.error("Please enter email and password");
const toastId = toast.loading("Logging in")

     const error=   await  credentialsLogin(email,password)
     if(!error)
       {
         toast.success("Login Succesfully",{
        id:toastId,
     });
     router.refresh()
    
    }
  else{
    toast.error(String(error),{
        id:toastId,
    })
  }
        }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input  className='p-2' type="text" name="email" id="email" placeholder="Enter Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input className='p-2' type="password" name="password" id="email" placeholder="Enter Password" />
            </div>
            <Button className='text-xl font-bold' type="submit" variant="ghost">Login</Button>
          </div>
        </form>
  

    </div>
  )
}

export default LoginForm