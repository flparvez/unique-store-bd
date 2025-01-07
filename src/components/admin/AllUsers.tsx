import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Link from 'next/link';

interface Users {
  _id: string;
  name: string;
  email: string;
  date: string;
}
const AllUsers =async () => {
//  fetch user by fetch request

let data = await fetch('https://Unique Store BD.vercel.app/api/users')
let users = await data.json()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {users?.map((user: Users) => (
      <div key={user._id}>
        <Card className="w-full max-w-sm mx-auto">
          <div>
            <div className="relative">
        
            </div>
            <CardContent>
              <h2 className="text-xl font-bold mb-2 mt-2">{user.name}</h2>
              <h2 className="text-xl font-bold mb-2 mt-2">{user.email}</h2>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
             <h2>{user._id}</h2>
             
            </CardFooter>
          </div>
        </Card>
      </div>
    )) }
  </div>
  )
}

export default AllUsers
