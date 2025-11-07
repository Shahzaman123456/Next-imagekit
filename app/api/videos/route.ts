import { connectToDataBase } from "@/lib/db";
import { authOption } from "@/lib/option";
import Video, { IVideo } from "@/models/videos";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await connectToDataBase();
       const videos = await Video.find({}).sort({createdAt:-1}).lean()
if(!videos || videos.length === 0){
    return NextResponse.json([],{status:200})
}

return NextResponse.json(videos)

    } catch (error) {
       return NextResponse.json(
        {error :"Fiald To Fetch  videos"},
        {status:200}
    )
    }
}

export async function POST(request:NextRequest) {
    try {
      const session= await getServerSession(authOption)
      if(!session){
        return NextResponse.json(
            {error:"Unauthrized"},
            {status:401}
        )
      }

 await connectToDataBase()
 const body:IVideo = await  request.json()     
if(!body.title || !body.description || !body.videoUrl || !body.tumbmnaiUrl){
     return NextResponse.json(
            {error:"Missing required fields"},
            {status:400}
     )
}

const videoData={
    ...body,
    controls :body.controls ?? true,
    transformation:{
        height:1920,
        width:1080,
        quality:body.transformation?.quality ?? 100
        }
}
          const newVideo=await Video.create(videoData)
          return NextResponse.json(newVideo)


    } catch (error) {
        return NextResponse.json(
            {error:"Fiald to create a video"},
            {status:400}
        ) 
    }
}