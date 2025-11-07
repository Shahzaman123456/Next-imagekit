import { channel } from "diagnostics_channel";
import mongoose from "mongoose";


const MONGODB_URL=process.env.MONGODB_URL!;

if(!MONGODB_URL){
    throw new Error("Please Define MonGo Db in Erv")
}

let cached=global.mongoose;

if(!cached){
    cached=global.mongoose ={conn : null,promise :null  }
}

export async function connectToDataBase(){
    if(cached.conn){
   return cached.conn
    }

   if (!cached.promise) {
  const opts = { bufferCommands: true, maxPoolSize: 10 };

  cached.promise = mongoose.connect(MONGODB_URL, opts).then(() => mongoose.connection);
}


      try {
        cached.conn=await cached.promise
      } catch (error) {
        console.error("database error",error)
        cached.promise=null
        throw new Error("Cheak database File")
      }

      return  cached.conn
}

