import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connectDB();


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 }) ;
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {        
            return NextResponse.json({ error: "Invalid password" }, { status: 400 }) ;
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        
        const response = NextResponse.json({ message: "User logged in successfully", success: true, })
        
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response





    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}