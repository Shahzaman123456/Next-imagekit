import { IVideo } from "@/models/videos";

export type VidoeFormData=Omit<IVideo,"_id">
type FetchOptions={
    method? :  "GET" | "POST" | "PUT" | "DELETE";
    body?:any;
    headers?:Record<string,string> 
}


class ApiClient{
    private async  myfetch<T>(
        endpoint:string,
        options:FetchOptions={}
    ):Promise<T> {
        const {method="GET",body,headers={}}=options
        const defaultHeaders={
            "Content-Type":"application/json",
          ...headers
        }
    const response=await fetch(`/api${endpoint}`,{
            method,
            headers:defaultHeaders,
            body:body? JSON.stringify(body):undefined
        })
        if(!response.ok){
            throw new  Error(await response.text());
        }
        return response.json();
    }

    async getVideos(){
        return this.myfetch<IVideo[]>("/videos")
    }

    async  getAvideos(id:string ) {
        return   this.myfetch<IVideo>(`/videos/${id}`)
    } 
async createVideo<IVideo>(videoData:VidoeFormData) {
    return  this.myfetch("/videos",{
        method:"POST",
        body:videoData
    })
}
    
}

export const apiClient =new ApiClient()