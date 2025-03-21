import { useState, useEffect } from "react";
import ContentBar from "./contentBar";
import { useSearch } from "./SearchContext";

export default function Trending() {
  const { description, isLoading, setIsLoading } = useSearch();
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const storedTrends = localStorage.getItem("trends");
    if (storedTrends) {
      try {
        setTrends(JSON.parse(storedTrends));
      } catch (error) {
        console.error("Error parsing trends from localStorage:", error);
        setTrends([]);
      }
    }
  }, []);

  useEffect(() => {
    if (!description.trim() === "") {
      setTrends([]);
      localStorage.removeItem("trends");
      return;
    }

    async function fetchVideos() {
      const API_KEY = "AIzaSyC51xFNtD_0T1JXEs1g46xAXI4uvugvMjo";
      const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        description
      )}&maxResults=14&type=video&key=${API_KEY}`;

      try {
        setIsLoading(true);
        const response = await fetch(URL);
        const data = await response.json();
        setTrends(data.items || []);
        localStorage.setItem("trends", JSON.stringify(data.items));
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, [description, setIsLoading]);

  return (
    <div>
      <h2 className="text-3xl font-black p-12 pb-2">
        <span className="tracking-wide">Trends.</span>
        <p className="text-2xl text-gray-600">
          {description ? `${description}'s foundation.` : ""}
        </p>
      </h2>
      <ContentBar />
      <ul className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 items-start px-8">
        {isLoading ? (
          <Loader />
        ) : trends.length > 0 ? (
          trends.map((video) => (
            <VideoItem
              key={
                video.id.videoId || video.id.channelId || video.id.playlistId
              }
              video={video}
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}

function VideoItem({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId =
    video?.id?.videoId || video?.id?.channelId || video?.id?.playlistId;
  if (!videoId) return null;

  return (
    <li className="mb-8 cursor-pointer relative flex">
      {!isPlaying ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Video Thumbnail"
            className="rounded-lg shadow-lg w-full h-[200px] object-cover"
          />
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center rounded-full bg-opacity-50 p-4"
          >
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="54px"
              height="54px"
              viewBox="-10.89 -10.89 384.80 384.80"
              xml:space="preserve"
              fill="#fff"
              stroke="#fff"
              stroke-width="9.801675"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path
                      style={{ fill: "#fff" }}
                      d="M155.859,241.706c-3.605,0-7.188-0.863-10.37-2.499c-7.682-3.899-12.459-11.699-12.459-20.339 v-74.717c0-8.631,4.777-16.431,12.479-20.353c7.582-3.823,16.991-3.062,23.795,1.898l51.308,37.355 c5.878,4.286,9.389,11.182,9.389,18.455s-3.511,14.175-9.389,18.457l-51.308,37.362 C165.382,240.19,160.73,241.706,155.859,241.706z M155.868,133.032c-1.747,0-3.497,0.415-5.055,1.207 c-3.742,1.907-6.072,5.709-6.072,9.912v74.723c0,4.208,2.33,8.005,6.078,9.909c3.666,1.881,8.246,1.515,11.587-0.915 l51.311-37.367c2.859-2.081,4.574-5.443,4.574-8.988c0-3.543-1.715-6.902-4.574-8.995l-51.311-37.355 C160.496,133.77,158.238,133.032,155.868,133.032z"
                    ></path>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <path
                      style={{ fill: "#fff" }}
                      d="M181.512,363.024C81.427,363.024,0,281.601,0,181.513C0,81.43,81.427,0,181.512,0 c100.089,0,181.513,81.43,181.513,181.513C363.025,281.601,281.601,363.024,181.512,363.024z M181.512,11.71 C87.88,11.71,11.71,87.883,11.71,181.513c0,93.627,76.17,169.802,169.802,169.802c93.627,0,169.803-76.175,169.803-169.802 C351.315,87.883,275.139,11.71,181.512,11.71z"
                    ></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
        </>
      ) : (
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={video.snippet.title}
          className="rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      <h3 className="font-semibold absolute bottom-[-40px] left-0 w-full p-2 text-lg z-10">
        {video.snippet.title.split(" ").slice(0, 4).join(" ")}
        {video.snippet.title.split(" ").length > 4 ? "..." : ""}
      </h3>
    </li>
  );
}

function Loader() {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}
