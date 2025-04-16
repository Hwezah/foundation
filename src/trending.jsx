import { useState } from "react";
import ReactPlayer from "react-player";
import { useSearch } from "./SearchContext";
import { fetchData } from "./Services/api";
import React, { memo } from "react";
import Podcasts from "./Podcasts";
import { YouTubeSearchApi } from "./Services/api";
function Trending() {
  const {
    description,
    isLoading,
    trends,
    setSelectedVideo,
    error,
    setIsLoading,
    setError,
    setTrends,
  } = useSearch();
  console.log("useSearch context:", {
    description,
    isLoading,
    trends,
    error,
  });

  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Sermons");

  function handleLoadMore() {
    const nextPageToken = localStorage.getItem("nextPageToken") || "";
    if (!description || description.trim() === "") {
      setError("Please enter a valid search term.");
      return;
    }

    if (nextPageToken || trends.length === 0) {
      const URL = YouTubeSearchApi(description, nextPageToken);

      // Pass arguments in the correct order
      fetchData(URL, setIsLoading, setError, setTrends, nextPageToken);
    } else {
      setError("No next page available.");
    }
  }

  return (
    <div>
      <div className=" lg:pt-6 px-2 pt-6 xl:pb-1 xl:px-10 md:px-4 sm:px-2 lg:px-6 xl:pt-10">
        <span className="text-xl md:text-3xl font-black tracking-wide pb-1 ">
          Trends.
        </span>
        {/* {description && (
          <span className="text-[#4a5759] text-xl md:text-3xl font-black ">
            {`${description}'s foundation.`}
          </span>
        )} */}
      </div>
      <ContentBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory === "Podcasts" ? (
        <Podcasts category={description} />
      ) : (
        <ul className="xl:p-10 md:p-4 sm:p-2 lg:p-6 !pt-0 grid sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] min-h-[40vh] gap-4">
          {isLoading ? (
            <Loader />
          ) : trends.length ? (
            trends.map((video) => (
              <VideoItem
                key={
                  video.id.videoId || video.id.channelId || video.id.playlistId
                }
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
      )}
      <>
        <button
          onClick={handleLoadMore}
          className="flex items-center gap-2 mx-auto
 text-white  px-4 rounded-lg"
        >
          <svg
            height={"44px"}
            width={"44px"}
            viewBox="-2.24 -2.24 36.48 36.48"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#fff"
            stroke="#fff"
            stroke-width="0.64"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="icomoon-ignore"> </g>{" "}
              <path
                d="M20.462 10.824l-9.265 9.196 0.753 0.756 9.265-9.196z"
                fill="#fff"
              >
                {" "}
              </path>{" "}
              <path
                d="M6.937 21.864c-3.234 0-5.864-2.631-5.864-5.864s2.631-5.864 5.864-5.864c1.566 0 2.987 0.621 4.040 1.624l0.001-0.006 0.054 0.047 2.076 2.066h-1.905v1.066h3.732v-3.732h-1.066v1.918l-2.084-2.074-0.005 0.005c-1.251-1.224-2.959-1.982-4.842-1.982-3.821 0-6.931 3.109-6.931 6.931s3.109 6.931 6.931 6.931c1.971 0 3.747-0.831 5.011-2.156l-0.753-0.754c-1.070 1.132-2.581 1.844-4.258 1.844z"
                fill="#fff"
              >
                {" "}
              </path>{" "}
              <path
                d="M25.063 9.069c-1.765 0-3.373 0.668-4.597 1.759l0.753 0.753c1.030-0.898 2.373-1.446 3.844-1.446 3.234 0 5.864 2.631 5.864 5.864s-2.631 5.864-5.864 5.864c-1.56 0-2.976-0.616-4.028-1.613l-0.002 0.010-3.531-3.518-0.757 0.751 3.535 3.522 0.006-0.006c1.245 1.187 2.925 1.921 4.776 1.921 3.821 0 6.931-3.109 6.931-6.931s-3.109-6.931-6.931-6.931z"
                fill="#fff"
              >
                {" "}
              </path>{" "}
            </g>
          </svg>
        </button>
      </>
    </div>
  );
}
export default memo(Trending);

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

function ErrorMessage({ message }) {
  return <p className="ml-4">{message}</p>;
}

export function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}
function ContentBar({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "Sermons",
    "Podcasts",
    "Music",
    "Bible Studies",
    "Prayer",
    "Live-feed",
    "Testimonies",
  ];
  return (
    <div className="flex pb-2 xl:pb-3 xl:px-10 md:px-4 sm:px-2 lg:px-6  overflow-x-auto justify-between gap-4 text-sm lg:text-md font-bold scrollbar-hidden">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          href={`/${category.toLowerCase().replace(" ", "-")}`}
          className={`${
            selectedCategory === category
              ? "bg-[#78898b] text-[#01222e]"
              : "bg-[#01222e] text-[#78898b]"
          } px-2 py-1 lg:px-3 lg:py-1.5 rounded-sm whitespace-nowrap font-semibold`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
