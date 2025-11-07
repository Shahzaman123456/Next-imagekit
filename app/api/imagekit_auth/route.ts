import ImageKit from "imagekit";
import { NextResponse } from "next/server";


const imagekit=new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint:process.env.URL_endpoint!

});

export async function GET() {
   const authenticationPrameter=imagekit.getAuthenticationParameters();
    try {
    return NextResponse.json(authenticationPrameter);     
    } catch (error) {
        console.error("Imagekit error",error)
         return NextResponse.json(
            {error:"Imagekit Auth Faild"},
            {status:500}
         )
    }
   
}