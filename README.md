
1. npm install prisma --save-dev
2. npx prisma init --datasource-provider mysql
3. mysql database connection 

4. schema.prisma
    Model = model er kaj hosse database e table create kora
    model user{

    }

    database e table toiri korte gele firstly primary key lage  

5. npx primsa migrate dev 



@id means = primary key hisebe initiate kore deya.
@default(autoincrement()) means = by default mysql database primary key k auto increment kore deya.

@unique means= data duplicate value create hoyer sujug thake na

@db means= database attribute, ja data type declare bujai




enum data means =
===============
 kono akta column e kisu data allow kora , and ki ki value allow korbe ta fixed kore deya and fixed
 data sara onno data insert hobe na.

enum userType{
    New 
    Existing
    VIP
    Regular
    Bad
}

model User{
    id Int @id @default(autoincrement())
    remarks UserType // enum data
}

one to one relation
==================
model user {
  id Int @id @default(autoincrement())
  email String
  password String
  profile profile?
}


model profile{
  id Int @id @default(autoincrement())
  fname String
  lname String
  city  String
  postCode  String
  userID    Int @unique
  user user @relation(fields: [userID], references: [id], onDelete: Restrict, onUpdate: Cascade)
}

//one to one relation er jonno forein key @unique hoi, karon aktai profile hoi
//one to many relation er jonno forein key @unique hoi na, karon user onek ber post korte pare 
//onUpdate: Cascade = means akta change hole arekta change hoye jabe
//profile profile? = ? symbol one to one relation er jonno
// post   post[]  = [] symbol one to many relation er jonno


one to many relation
====================
model user {
  id Int @id @default(autoincrement())
  email String
  password String
  profile profile?
  post post[]
}


model post {
  id Int @id @default(autoincrement())
  title String
  description String
  userID Int
  user user @relation(fields: [userID], references: [id], onDelete: Restrict, onUpdate: Cascade)
}


many to many relation
=====================
akta post er onek gulu comment thakte pare aber aki user er onek gulu comment thakte pare, tahole
2 dik theke many, post er dik theke onek gulu comment hote pare, aber user er dik theke onek gulu 
comment thakte pare ,


model user {
  id Int @id @default(autoincrement())
  email String
  password String
  profile profile?
  post post[]
  comment comment[]
}


model profile{
  id Int @id @default(autoincrement())
  fname String
  lname String
  city  String
  postCode  String
  userID    Int @unique 
  user user @relation(fields: [userID], references: [id], onDelete: Restrict, onUpdate: Cascade)
}

model post {
  id Int @id @default(autoincrement())
  title String
  description String
  userID Int
  user user @relation(fields: [userID], references: [id], onDelete: Restrict, onUpdate: Cascade)
  comment comment[]
}

model comment{
  id Int @id @default(autoincrement())
  des String
  userID Int
  user user @relation(fields: [userID], references: [id], onDelete: Restrict, onUpdate: Cascade)

  postID Int
  post post @relation(fields: [postID], references: [id], onDelete: Restrict, onUpdate: Cascade)
}




BLOB
====

BLOB stands for “Binary Large Object” and represents a database type to store binary data. Specifically, examples of BLOBs (Binary Large Objects) are complex files such as images, video, and audio.
 

                              CRUD (route.js file)
=============================================================

Database Query manage kora means database e data create kora, database theke date delete kora
update kora, Read kora. bivinno condition diya data read kora

PrismaClient 
------------
prisma joto gulu database operation korbo , ta sob gulu amra korbo prismaClient diya.
a jonno akta prisma object toiri korte hoi. R ae prisma object diya CRUD korar option pabo.
exam: create(),find(),update(),delete(). 
Query related sob building method paya jai.

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); //prisma->object

 

//single data insert er jonno, create()
//multiple data insert er jonno, createMany() and data:[] arry vitor json akare 
 multiple data dite hoi.


single data create
===================
export async function POST(req, res){
  try{

    const reBody = await req.json(); //single data receive from postman

    const prisma = new PrismaClient();

    let result = await prisma.employee.create({
      data:reBody //single data 
    })
    
    return NextResponse.json({status:"success", data:result})
  }
  catch(e){
    return NextResponse.json({status: "fail",data:e})
  }
}

multiple data create
====================
export async function POST(req, res){
  try{

    const prisma = new PrismaClient();
    
    let result = await prisma.employee.createMany({
      data:[
        {name:"mostafij", designation: "developer", city:"dhaka", salary: 50000},
        {name:"mostafij2", designation: "developer2", city:"dhaka2", salary: 50000},
        {name:"mostafij3", designation: "developer3", city:"dhaka3", salary: 50000},
        {name:"mostafij4", designation: "developer4", city:"dhaka4", salary: 50000}
      ]
    })

    return NextResponse.json({status:"success", data:result})
  }
  catch(e){
    return NextResponse.json({status: "fail", data:e})
  }
}



relationship akadik table er maje aksate data insert kora
========================================================
akta user table thakle tar akta profile table thake, ae 2ta table er maje relation hosse one to one.
akhane relationship er parent hosse-user and child-profile. insert create suru hobe user diye and tar
vitor thakbe child ba profile.  orthat nested hobe. post table o nested. schema.prisma code onusare

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




Data Update 
===========
===========
data update korar jonno 2ta information/data nextJS je API end point/post method vitor send korte hobe.
1. kon id te update korte chaisi sei id ta, je id dhore se specific akta row k prothome select korbe,
  and updated data diya ta change kore dibe. id send korbo url parameter/query string diye.
2. updated je information/data segulu

const{searchParams} = new URL(req.url); //url parameter dhorar jonno searchParams use hosse
const id = searchParams.get('id'); //searchParams theke get er madhome id ta pabo
const reqBody = await req.json();// updated data receive from postman/frontend

postman url: http://localhost:3000/api/demo?id=1
 // demo?id=1  means url parameter, akhane 1 no row te data update hobe 

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


Data Delete
============ 
============
data delete er jonno data row ar id holei hobe
postman/frontend theke data receive korar jonno --> reBody dorkar nai

//postman url: http://localhost:3000/api/demo?id=4
  //demo?id=4  means akhane 4 no row er data delete hobe

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {

  try {

    const{searchParams} = new URL(req.url)
    //const id = searchParams.get('id')
    const id = parseInt(searchParams.get('id')) //data integer e convert kkorse- parseInt

    const prisma = new PrismaClient();

    const result = await prisma.employee.delete({
      where:{id:id}
    })
  

    return NextResponse.json({ status: "success", data: result })
  }
  catch (e) {
    return NextResponse.json({ status: "fail", data: e })
  }
}






Find Query / database theke data select kora
===============================================
===============================================
Find Query means = database thek bivinno data select korar tecnic, a jonno onke method ase
jemon-findMany(),findMany Where And Select,
      findUnique by id, findFirst(),
      find orderBy, Find Last using findFirst(),
      Find With Limit Skip, Find With Relation,
      Find With Nested Relations, Find Search


findMany()
-----------
export async function POST(req, res) {

  try {

    const prisma = new PrismaClient();

   //akhane employee table e all data select kore dekhab                                 
    const result = await prisma.employee.findMany();
    
    return NextResponse.json({ status: "success", data: result })
  }
  catch (e) {
    return NextResponse.json({ status: "fail", data: e })
  }
}
const result = await prisma.employee.findMany(); 

findMany Where And Select
-------------------------
findMany() vitor Where use kore data select kora, where = ki find korbe, select = je column er data
se column select kora, ajonno oe column true kore dite hobe,na chaile false
const result = await prisma.employee.findMany({
      where:{name: "mostafij"},
      select: {id: true, name: true, designation:false, salary:true}
});


contains= use kore search korte pari, je kono akta column er upor text search kora jai 
------contains prismar akta attribute.

const result = await prisma.post.findMany({

  where:{title:{contains:"Demo"}},//title namer column e Demo search korbe, contains casesensative noi.
});


 

orderBy
--------
take= use kore bole dite pari koita data select korbo
skip= use kore bole dite pari first koita data se skip/bad diye select kore dekhabe 

const result = await prisma.employee.findMany({

      //orderBy:{id: 'asc'}, 
      // orderBy:{salary: 'desc'}, 

      //orderBy:{salary: 'desc'},
      //take:3 

      orderBy:{salary: 'desc'},
      skip:2,
      take:3 

});


findFirst
---------
 //const result = await prisma.employee.findFirst();
  const result = await prisma.employee.findFirst({
    orderBy:{id:"desc"}
  });


findUnique
----------
akta unique data k select korbe.
const result = await prisma.user.findUnique({
     //where:{id:2}
      where:{email:'A@A.com'}
});


Find with Relation
------------------
akta table er vitor theke R akta table er data select kore ana, a jonno inclue method use hoi
include diye kon table/model theke data ana hobe ta bole deya ba true kore deya

const result = await prisma.user.findMany({

      include:{profile:true, post:true}
});

const result = await prisma.user.findMany({
    //where:{email:'A@A.com'},
    where:{email:{contains:"A"}}, //user model er upor use hosse
    include:{profile:true, post:true}
});


select use kore akta model theke onno model er data select kore find kora
--------------------------------------------------------------
const result = await prisma.user.findMany({
      select:{
        id:true,
        profile: {select:{firstName:true, lastName:true}},
        post: {select:{title:true, description:true}},
        comment: {select:{text:true}},
      }
});



Nested Relation
----------------
akta relationship er vitor jokhon onek gulu model/table niye kaj kori, tokhon oi model gulur vitor
where condition use korte pari. ja relation model er upor use hobe,


 const result = await prisma.user.findMany({
      
      include:{
        profile:{select:{firstName:true, lastName:true}},
        post:{
          where:{title:{contains:"demo"}},
        }
      }
});




