import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();


export async function POST(request: NextRequest) {
    //extract data from token
   const userId = await getDataFromToken(request)
    const user = await User.findOne({ _id: userId }).select("-password")
    
    //check if there is no user
    return NextResponse.json({
        message: "User fetched successfully",
        success: true,
        data: user

    })



 }