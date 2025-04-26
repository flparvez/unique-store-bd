
import { Button } from "../../../components/ui/button"

import { Input } from "../../../components/ui/input"
import { Label } from "@/components/ui/label"


import {hash} from 'bcryptjs'
import { redirect } from "next/navigation"
import { connectDb } from "../../../lib/DbConnect"
import {User} from "../../../models/userSchema"





const RegisterC = () => {

    const SignUp = async (formData:FormData) => {
        "use server"
            const name = formData.get('name') as string | undefined;
            const email = formData.get('email') as string | undefined;
            const password = formData.get('password') as string | undefined;

            if (!name || !email || !password)    throw new Error("Please enter email and password name");

            // connection with database

            await connectDb();
            const user = await User.findOne({email});
if(user) throw new Error("User Already Exist")

const hashedPassword = await hash(password,10)

// create new user
await User.create({
name,
email,
password:hashedPassword,
})

           redirect('/auth/login')
    }
  return (
    <form action={SignUp}>
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Enter Name" required />
      </div> 
       <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Email</Label>
        <Input type="text" name="email" id="email" placeholder="Enter Email" required />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Password</Label>
        <Input type="password" name="password" id="email" placeholder="Enter Password" required />
      </div>
     
      <Button variant="ghost">Signup</Button>
    </div>
  </form>
  )
}

export default RegisterC