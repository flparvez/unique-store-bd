
import { Button } from "../../../components/ui/button"
import {
    Card,
    CardContent,
CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"


import Link from "next/link"


// import { toast } from "sonner"
import RegisterC from "./RegisterC"
import { signIn } from "@/auth"



const Page = () => {

 
  return (
    <div className='flex justify-center '>
       <Card className="w-[350px]  mt-32">
      <CardHeader>
        <CardTitle>Signup Page</CardTitle>
        <RegisterC />
      </CardHeader>
      <CardContent>
    
      </CardContent>
  <CardFooter className="flex flex-col gap-4">
    <span>Or</span>
    <form action={async ()=>{
      "use server"
      await signIn("google")
    }}>
        <Button type="submit">Register With Google</Button>
    </form>
    <Link href='/auth/login'>
    Already have an account?  Login</Link>
  </CardFooter>
    </Card>
  
    </div>
  )
}

export default Page