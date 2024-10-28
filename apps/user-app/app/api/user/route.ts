import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    if(!session.user){
        redirect("/mainpage")
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}