import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



export async function POST(req, res) {

  try {

    const prisma = new PrismaClient();

    // const result = await prisma.employee.findMany();


    // const result = await prisma.employee.findMany({
    //   where:{name: "mostafij"},
    //   select: {id: true, name: true, designation:false, salary:true}
    // });



    // const result = await prisma.post.findMany({

    //   where:{title:{contains:"demo"}}, 
    // });



    // const result = await prisma.employee.findMany({

    //   // orderBy:{id: 'asc'}, 
    //   // orderBy:{salary: 'desc'}, 
    //   orderBy:{salary: 'desc'}, 
    //   skip:2,
    //   take:2
    // });



    //const result = await prisma.employee.findFirst();
    // const result = await prisma.employee.findFirst({
    //   orderBy:{id:"desc"}
    // });



    // const result = await prisma.user.findUnique({
    //  //where:{id:2}
    //   where:{email:'A@A.com'}
    // });



    // const result = await prisma.user.findMany({

    //   include:{profile:true, post:true}
    // });


    // const result = await prisma.user.findMany({
    //   //where:{email:'A@A.com'},
    //   where:{email:{contains:"A"}},
    //   include:{profile:true, post:true}
    // });

    // const result = await prisma.user.findMany({
      
    //   include:{
    //     profile:{select:{firstName:true, lastName:true}},
    //     post:{
    //       where:{title:{contains:"demo"}},
    //     }
    //   }
    // });


  const result = await prisma.user.findMany({
      select:{
        id:true,
        profile: {select:{firstName:true, lastName:true}},
        post: {select:{title:true, description:true}},
        comment: {select:{text:true}},
      }
  });


    return NextResponse.json({ status: "success", data: result })
  }
  catch (e) {
    return NextResponse.json({ status: "fail", data: e })
  }
}


