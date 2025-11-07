"use client";
import { Image } from "@imagekit/next";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/videos";
import { useEffect, useState } from "react";

export default function page() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        console.log("API Response:", data); 
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <Image
          key={video._id?.toString()}
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={video.tumbmnaiUrl || "/placeholder.png"}  
          width={300}
          height={400}
       alt={video.title || "video thumbnail"}
       loading="eager"
          className="rounded-lg shadow-md"
        />
      ))}
      <h1>Image</h1>
    </div>
  );
}
