import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function POST(request: NextRequest) {
    const session  = getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    const body = await request.json();

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newIssue, { status: 201 });
}