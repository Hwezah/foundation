import React, { useState, useEffect } from "react";
import { fetchData } from "./Services/api";
import { useSearch } from "./SearchContext";
import ReactPlayer from "react-player";
import { Loader } from "./loader";

export async function sermonsApi(description, pageToken = "") {
  const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
  console.log("Description:", description);
  console.log("Page Token:", pageToken);
  if (!description) return []; // Return an empty array if no category is provided

  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    description
  )}&maxResults=50&pageToken=${pageToken}&type=video&key=${API_KEY}`;

  try {
    const data = await fetchData(URL);

    return data.items || [];
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function Sermons({ description, pageToken = "" }) {
  const [isLoadingSermons, setIsLoadingSermons] = useState(false);
  const [error, setError] = useState(null);
  const { setSelectedVideo } = useSearch(); // Assuming you have a context or prop for this
  const [sermons, setSermons] = useState([]); // Add podcasts state for demonstration
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    const fetchSermons = async () => {
      if (!description || typeof description !== "string") {
        console.error("Invalid description:", description);
        return;
      }
      const pageToken = localStorage.getItem("nextPageToken") || ""; // Retrieve pageToken

      if (pageToken && typeof pageToken !== "string") {
        console.error("Invalid pageToken:", pageToken);
        return;
      }
      setIsLoadingSermons(true);
      setError(null);

      try {
        // Retrieve pageToken

        const results = await sermonsApi(description); // Call the exported function
        setSermons(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingSermons(false);
      }
    };

    fetchSermons();
  }, [description, pageToken]); // Add category to the dependency array

  return (
    <ul className="xl:p-10 md:p-4 sm:p-2 lg:p-6 !pt-0 grid sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] min-h-[40vh] gap-4">
      {isLoadingSermons ? (
        <Loader />
      ) : sermons.length ? (
        sermons.map((video) => (
          <VideoItem
            key={video.id.videoId || video.id.channelId || video.id.playlistId}
            video={video}
            isPlaying={playingVideoId === video.id.videoId}
            onPlay={() => setPlayingVideoId(video.id.videoId)}
            onClick={() => setSelectedVideo(video)}
          />
        ))
      ) : (
        <ErrorMessage message={error} />
      )}
    </ul>
  );
}

export function ErrorMessage() {
  return <p>Empty Query</p>;
}

function VideoItem({ video, onClick, isPlaying }) {
  const videoId = video?.id?.videoId;
  if (!videoId) return null;

  return (
    <li className="mb-8 cursor-pointer relative flex" onClick={onClick}>
      {!isPlaying ? (
        <div
          className="w-full h-[200px] bg-cover bg-center md:rounded-lg shadow-lg"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
          }}
        >
          <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <svg
              fill="#fff"
              height="44px"
              width="44px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 459 459"
              xml:space="preserve"
              stroke="#fff"
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
                    <path d="M229.5,0C102.751,0,0,102.751,0,229.5S102.751,459,229.5,459S459,356.249,459,229.5S356.249,0,229.5,0z M310.292,239.651 l-111.764,76.084c-3.761,2.56-8.63,2.831-12.652,0.704c-4.022-2.128-6.538-6.305-6.538-10.855V153.416 c0-4.55,2.516-8.727,6.538-10.855c4.022-2.127,8.891-1.857,12.652,0.704l111.764,76.084c3.359,2.287,5.37,6.087,5.37,10.151 C315.662,233.564,313.652,237.364,310.292,239.651z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
        </div>
      ) : (
        <VideoEmbed videoId={videoId} title={video.snippet.title} />
      )}
      <h3 className="truncate absolute bottom-[-30px] w-full p-2 lg:bottom-[-37px] text-sm lg:text-lg">
        {video.snippet.title}
      </h3>
    </li>
  );
}

export function VideoEmbed({
  videoId,
  title,
  width = "100%",
  height = "100%",
  className = "",
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      aria-label={title}
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}&modestbranding=1`}
        width="100%"
        height="100%"
        playing
        controls={true} // or true if you want native controls
      />
    </div>
  );
}
