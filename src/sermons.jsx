import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./Services/api";
import { useSearch } from "./SearchContext";
import ReactPlayer from "react-player";
import { Loader } from "./loader";
import { useLocalStorage } from "./Services/useLocalStorage";
import { toast } from "react-hot-toast";

export default function Sermons() {
  const [sermons, setSermons] = useLocalStorage([], "sermons");
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const { query, dispatch } = useSearch(); // assuming query comes from context
  const [pageToken, setPageToken] = useState("");

  const API_KEY = "AIzaSyCyDM6zL56RjPY62zE30wi6TweFQXjCIYo";
  //   const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
  //   const API_KEY = "AIzaSyB-t8E-UrOC8CMTfpjLdMd7dZUejXvwx1c";
  //   const API_KEY = "AIzaSyCNyHlY3nfI0eJYR7_xHTobtrRTX3puk94";
  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&maxResults=4&pageToken=${pageToken}&type=video&key=${API_KEY}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["sermons", query, pageToken],
    queryFn: () => fetchData(URL),
    onSuccess: () => {
      console.log("onSuccess triggered in Sermons.jsx. Data received:");
      toast.success("Sermons loaded successfully!");
    },

    onError: (err) => {
      toast.error(err.message);
    },
    enabled: !!query, // only fetch if query exists
    keepPreviousData: true, // keep old data while fetching new
  });

  // Update sermons when data changes
  useEffect(() => {
    if (data?.items) {
      setSermons((prevData) =>
        pageToken ? [...prevData, ...data.items] : data.items
      );
    }
  }, [data, pageToken, setSermons]);

  function handleLoadMoreSermons() {
    const nextPageToken = localStorage.getItem("nextPageToken");
    if (!query || query.trim() === "") {
      dispatch({
        type: "REJECTED",
        payload: "Please enter a valid search term.",
      });
      return;
    }

    if (nextPageToken) {
      setPageToken(nextPageToken); // triggers a new query because pageToken changes
    } else {
      dispatch({ type: "REJECTED", payload: "No more results" });
    }
  }

  return (
    <div>
      <ul className="xl:p-10 md:p-4 sm:p-2 lg:p-6 !pt-0 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] min-h-[40vh] gap-4">
        {isLoading ? (
          <Loader />
        ) : sermons.length ? (
          sermons.map((video) => (
            <VideoItem
              key={
                video.id.videoId || video.id.channelId || video.id.playlistId
              }
              video={video}
              isPlaying={playingVideoId === video.id.videoId}
              onPlay={() => setPlayingVideoId(video.id.videoId)}
              onClick={() =>
                dispatch({ type: "SET_SELECTED_VIDEO", payload: video })
              }
              onPause={() => setPlayingVideoId(video)}
            />
          ))
        ) : (
          error && <ErrorMessage message={error.message} />
        )}
      </ul>
      <button
        onClick={handleLoadMoreSermons}
        className="flex items-center gap-2 mx-auto text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        <svg
          height={"34px"}
          width={"34px"}
          viewBox="-2.24 -2.24 36.48 36.48"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#fff"
          stroke="#fff"
          strokeWidth="0.64"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M20.462 10.824l-9.265 9.196 0.753 0.756 9.265-9.196z"
              fill="#fff"
            ></path>
            <path
              d="M6.937 21.864c-3.234 0-5.864-2.631-5.864-5.864s2.631-5.864 5.864-5.864c1.566 0 2.987 0.621 4.040 1.624l0.001-0.006 0.054 0.047 2.076 2.066h-1.905v1.066h3.732v-3.732h-1.066v1.918l-2.084-2.074-0.005 0.005c-1.251-1.224-2.959-1.982-4.842-1.982-3.821 0-6.931 3.109-6.931 6.931s3.109 6.931 6.931 6.931c1.971 0 3.747-0.831 5.011-2.156l-0.753-0.754c-1.070 1.132-2.581 1.844-4.258 1.844z"
              fill="#fff"
            ></path>
            <path
              d="M25.063 9.069c-1.765 0-3.373 0.668-4.597 1.759l0.753 0.753c1.030-0.898 2.373-1.446 3.844-1.446 3.234 0 5.864 2.631 5.864 5.864s-2.631 5.864-5.864 5.864c-1.56 0-2.976-0.616-4.028-1.613l-0.002 0.010-3.531-3.518-0.757 0.751 3.535 3.522 0.006-0.006c1.245 1.187 2.925 1.921 4.776 1.921 3.821 0 6.931-3.109 6.931-6.931s-3.109-6.931-6.931-6.931z"
              fill="#fff"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
}

export function ErrorMessage() {
  return <p>Empty Query</p>;
}

function VideoItem({ video, onClick, isPlaying }) {
  const videoId = video?.id?.videoId;
  if (!videoId) return null;

  return (
    <div className="custom748:flex">
      <li className=" cursor-pointer " onClick={onClick}>
        {!isPlaying ? (
          <div
            className=" w-full h-[200px] bg-cover bg-center md:rounded-lg shadow-lg relative"
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
      </li>
      <h3 className="truncate w-full p-2 text-sm lg:text-lg ">
        {video.snippet.title}
      </h3>
    </div>
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
