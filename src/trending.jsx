import { useState, useEffect } from "react";
import { useSearch } from "./constants";

export default function Trending() {
  const { description } = useSearch();
  const [trends, setTrends] = useState([]);

  // Load trends from localStorage when the component mounts
  useEffect(() => {
    const storedTrends = localStorage.getItem("trends");
    if (storedTrends) {
      setTrends(JSON.parse(storedTrends)); // Convert string back to array
    }
  }, []);

  useEffect(() => {
    if (description.trim() === "") {
      setTrends([]);
      localStorage.removeItem("trends"); // Clear stored trends if no description
      return;
    }

    async function fetchVideos() {
      const API_KEY = "YOUR_YOUTUBE_API_KEY";
      const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        description
      )}&maxResults=14&type=video&key=${API_KEY}`;

      try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log("API Response:", data);
        setTrends(data.items || []);

        // Store trends in localStorage
        localStorage.setItem("trends", JSON.stringify(data.items));
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    }

    fetchVideos();
  }, [description]);

  return (
    <div className="h-screen">
      <div>
        <h2 className="text-3xl font-black p-12 pb-2">
          <span className="tracking-wide">Trends.</span>
          <p className="text-2xl text-gray-600">
            {description ? `${description}'s foundation.` : ""}
          </p>
        </h2>
      </div>

      <ul className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-start px-8">
        {trends.length > 0 ? (
          trends.map((video) => {
            const videoId =
              video.id.videoId || video.id.channelId || video.id.playlistId;
            return videoId ? (
              <li key={videoId} className="mb-4 cursor-pointer relative flex">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="rounded-lg shadow-lg"
                />
                <h3 className="font-semibold absolute bottom-0 left-0 w-full p-2 text-sm z-10">
                  {video.snippet.title.split(" ").slice(0, 4).join(" ")}
                  {video.snippet.title.split(" ").length > 4 ? "..." : ""}
                </h3>
              </li>
            ) : null;
          })
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}
