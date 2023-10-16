import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


//akadik table er maje aksate data insert kora

export async function POST(req, res) {

  try {

    const prisma = new PrismaClient();

    const result = await prisma.user.create({
      data: {
        email: "A@B.com",
        password: "123",
        profile: {
          create: {
             firstName: "Rabbil",
             lastName: "Hasan",
             mobile: "0192588665",
             city: "Dhaka "
          }
        },
        post:{
          create:{
            title: "Demo",
            description: "demo"
          }
        }
      }
    })

    return NextResponse.json({ status: "success", data: result })
  }
  catch (e) {
    return NextResponse.json({ status: "fail", data: e })
  }
}

