import { NextRequest, NextResponse } from "next/server";
import { User, UserResponse, newUser, updateUser } from "@/db/models/users";
import { getUsers } from "@/db/models/users";

type ErrorResponse = {
    statusCode: number;
    message: unknown;
}

export const GET = async() => {
    try {
        const data = await getUsers()
        return NextResponse.json<UserResponse<User[]>>(
            {
                statusCode: 200,
                data: data
            }
        )
    } catch (error) {
        return NextResponse.json<ErrorResponse>(
            {
                statusCode: 500,
                message: "Internal Server Error"
            }
        )
    }

}

export const POST = async(request: NextRequest) => {
    try {
        const user = await request.json()
        const data = await newUser(user)
        return NextResponse.json<UserResponse<User>>(
            {
                statusCode: 200,
                data: data
            }
        )
    } catch (error) {
        return NextResponse.json<ErrorResponse>(
            {
                statusCode: 500,
                message: "Internal Server Error"
            }
        )
    }


}

export const PUT = async(request: NextRequest) => {
    try {
        const user = await request.json()
        const upUser = await updateUser(user)
        return NextResponse.json<UserResponse<User[]>>(
            {
                statusCode: 200,
                data: upUser
            }
        )
    } catch (error) {
        return NextResponse.json<ErrorResponse>(
            {
                statusCode: 500,
                message: "Inernal Server Error"
            }
        )
    }

}