import { connectDb } from "@/lib/DbConnect"
import { User } from "@/models/userSchema"
import { NextResponse } from "next/server"



export const GET = async () => {
try {
    connectDb()
    // get latest user data
    const user = await User.find().sort({createdAt:-1})
    
    return new NextResponse(JSON.stringify(user),{status:200})
} catch (error) {
    return new NextResponse("Error In Fetching Categories",{status:500});
}
}