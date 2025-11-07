"use client"

import { ImageKitProvider} from "@imagekit/next"
import { SessionProvider } from "next-auth/react";
import React from "react";


const urlEndPont=process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey=process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;



const authenticator=async () =>{
    try {
       const response= await fetch("/api/imagekit_auth") 

       if(!response.ok){
        const errText=await response.text();
        throw new Error(`Request Failed with status ${response.status} : ${errText}`);
       }

       const data=await response.json();
       const {signature,expire,token}=data;
       return {signature,expire,token};
    } catch (error) {
          console.log(error)
          throw Error(`ImageKit Authentication request  faild `)
    }
};

export default function Provider({children}:{children:React.ReactNode}){
    return(
        <SessionProvider> 
<ImageKitProvider {...({ urlEndpoint: urlEndPont, publicKey, authenticator } as unknown as any)}>
  {children}
</ImageKitProvider>
</SessionProvider>
    )
}