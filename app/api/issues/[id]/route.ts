import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {issuesSchema, patchIssueSchema} from "@/app/validationSchemas";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    const session  = getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);

    if(!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    if(body.assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: body.assignedToUserId,
            }
        })

        if(!user) {
            return NextResponse.json({error: "Invalid User"}, {status: 400})
        }
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        }
    })

    if(!issue) {
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 })
    }

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description,
            assignedToUserId: body.assignedToUserId,
        }
    });

    return  NextResponse.json(updatedIssue);

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        }
    })

    if(!issue) {
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 })
    }

    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    });

    return  NextResponse.json({});

}