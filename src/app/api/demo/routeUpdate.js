import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



export async function POST(req, res) {

  try {

    const{searchParams} = new URL(req.url)
    //const id = searchParams.get('id')
    const id = parseInt(searchParams.get('id')) //data integer e convert kkorse- parseInt
    const reqBody = await req.json();    

    const prisma = new PrismaClient();

    const result = await prisma.employee.update({
      //where:{id:1},
      where:{id:id},
      //data:{name:"Sumit",designation:"Software Eng",city:"Dhaka"}
      data:reqBody
    })
  

    return NextResponse.json({ status: "success", data: result })
  }
  catch (e) {
    return NextResponse.json({ status: "fail", data: e })
  }
}

