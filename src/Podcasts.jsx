import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "./Services/useLocalStorage";
import { fetchData } from "./Services/api";
import { Loader } from "./loader";
import { useSearch } from "./SearchContext";

export async function PodcastsApi(query, offset = 0) {
  if (!query) return []; // Return an empty array if no query is provided
  // const API_KEY = "5499e7a41f314beaab46610580e99eaf";
  // const API_KEY = "8bdff6c6a5a94d2d9f43c1ad32b5d19e";
  const API_KEY = "5499e7a41f314beaab46610580e99eaf";
  const URL = `https://listen-api.listennotes.com/api/v2/search?q=${encodeURIComponent(
    query
  )}&type=episode&sort_by_date=1&len_min=0&len_max=0&only_in=title,query,fulltext&&safe_mode=0&offset=${offset}&page_size=4`;

  try {
    const endpoint = {
      headers: {
        "X-ListenAPI-Key": API_KEY,
      },
    };

    const data = await fetchData(URL, endpoint);
    return data.results || [];
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function Podcasts({ query }) {
  const { dispatch, isloading } = useSearch();
  const [podcasts, setPodcasts] = useLocalStorage([], "podcasts");
  const [playingPodcastId, setPlayingPodcastId] = useState(null);
  const [progress, setProgress] = useState({});
  const [isSeeking, setIsSeeking] = useState(false);
  const [selectedPodcastId, setSelectedPodcastId] = useState(null);
  const audioRefs = useRef({}); // Store references to audio elements

  // Fetch and set podcasts
  async function fetchAndSetPodcasts(query, offset = 0, append = false) {
    try {
      dispatch({ type: "LOADING" });
      dispatch({ type: "REJECTED", payload: "" });

      const results = await PodcastsApi(query, offset);
      const nextOffset = offset + 4; // 4 = page_size
      localStorage.setItem("nextPage", nextOffset); // Update next page offset in localStorage

      setPodcasts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newUnique = results.filter((p) => !existingIds.has(p.id));
        return append ? [...prev, ...newUnique] : newUnique;
      });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    } finally {
      dispatch({ type: "LOADED" });
    }
  }

  // Initial fetch when query changes
  useEffect(() => {
    if (!query || typeof query !== "string") return;

    localStorage.setItem("nextPage", 4); // Set initial next page offset
    fetchAndSetPodcasts(query, 0, false); // Fetch and set the first set of podcasts
  }, [query]);

  // Load more podcasts
  async function handleLoadMorePodcasts() {
    const nextPage = parseInt(localStorage.getItem("nextPage"), 10); // Parse offset from localStorage

    if (!query || query.trim() === "") {
      dispatch({
        type: "REJECTED",
        payload: "Please enter a valid search term.",
      });
      return;
    }

    if (!isNaN(nextPage)) {
      await fetchAndSetPodcasts(query, nextPage, true); // true = append results
    } else {
      dispatch({ type: "REJECTED", payload: "No more results" });
    }
  }

  const handlePlayPause = (podcastId) => {
    const currentAudio = audioRefs.current[podcastId];

    if (playingPodcastId === podcastId) {
      // Pause the currently playing podcast
      currentAudio.pause();
      setPlayingPodcastId(null);
    } else {
      // Pause any other playing audio
      if (playingPodcastId && audioRefs.current[playingPodcastId]) {
        audioRefs.current[playingPodcastId].pause();
      }

      // Play the selected podcast
      if (currentAudio) {
        currentAudio.play();
        setPlayingPodcastId(podcastId);

        currentAudio.onloadedmetadata = () => {
          setProgress((prev) => ({
            ...prev,
            [podcastId]: {
              ...(prev[podcastId] || {}),
              duration: currentAudio.duration,
            },
          }));
        };

        currentAudio.ontimeupdate = () => {
          if (isSeeking) return;
          setProgress((prev) => ({
            ...prev,
            [podcastId]: {
              ...(prev[podcastId] || {}),
              currentTime: currentAudio.currentTime,
            },
          }));
        };
      }
    }
    setSelectedPodcastId(podcastId);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleDownload = (audioUrl, filename) => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = filename || "podcast.mp3";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" xl:pb-1 xl:px-10 md:px-4 sm:px-2 lg:px-6 ">
      {isloading && <Loader />}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div className=" grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))]  gap-4 gap-y-2 md:gap-y-4 ">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className={`${
              selectedPodcastId === podcast.id ? "bg-[#3f4c4e]" : "bg-[#01222e]"
            } p-3 lg:rounded shadow-md text-white relative max-h-[8.5rem]`}
          >
            <div className="flex gap-4 items-center ">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={podcast.image}
                  alt={podcast.title_original}
                  className=" rounded  object-cover"
                />
              </div>
              <div className="">
                {" "}
                <div className="flex">
                  <div className="w-[200px] overflow-hidden whitespace-nowrap">
                    <h4 className="text-md font-semibold mr-auto animate-marquee inline-block w-fit hover:[animation-play-state:paused]">
                      {podcast.title_original}
                    </h4>
                  </div>

                  <button
                    className="ml-auto"
                    onClick={() =>
                      handleDownload(
                        podcast.audio,
                        `${podcast.title_original || "podcast"}.mp3`
                      )
                    }
                  >
                    <svg
                      className=""
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                        <path
                          d="M22 20.8201C15.426 22.392 8.574 22.392 2 20.8201"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M11.9492 2V16"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M16.8996 11.8L13.3796 15.4099C13.2011 15.5978 12.9863 15.7476 12.7482 15.8499C12.5101 15.9521 12.2538 16.0046 11.9946 16.0046C11.7355 16.0046 11.4791 15.9521 11.241 15.8499C11.0029 15.7476 10.7881 15.5978 10.6096 15.4099L7.09961 11.8"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="flex items-baseline">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 font-medium  line-clamp-2 relative">
                      {podcast.description_original
                        ? podcast.description_original
                            .replace(/<[^>]*>/g, "")
                            .slice(0, 70) + "..."
                        : "No query available."}
                      <audio
                        ref={(el) => (audioRefs.current[podcast.id] = el)}
                        src={podcast.audio}
                      />
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayPause(podcast.id)}
                    className="self-end ml-auto"
                  >
                    {playingPodcastId === podcast.id ? (
                      <svg
                        className=""
                        height={"24px"}
                        width={"24px"}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                          <path
                            d="M15 6C15 6 15.5 9 15.5 12C15.5 15 15 18 15 18M9 6C9 6 8.5 9 8.5 12C8.5 15 9 18 9 18"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        className=" "
                        height={"24px"}
                        width={"24px"}
                        viewBox="-0.5 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                          <path
                            d="M7.98047 3.51001C5.43047 4.39001 4.98047 9.09992 4.98047 12.4099C4.98047 15.7199 5.41047 20.4099 7.98047 21.3199C10.6905 22.2499 18.9805 16.1599 18.9805 12.4099C18.9805 8.65991 10.6905 2.58001 7.98047 3.51001Z"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    )}
                  </button>
                </div>
                {playingPodcastId === podcast.id && (
                  <div className="">
                    <div className="flex items-center gap-2 mt--1rem]">
                      {/* <span className="text-sm text-gray-400 ">
                        {formatTime(progress[podcast.id]?.currentTime || 0)}
                      </span> */}
                      <input
                        type="range"
                        className="custom-range w-full cursor-pointer"
                        min="0"
                        max={progress[podcast.id]?.duration || 0}
                        value={progress[podcast.id]?.currentTime || 0}
                        onMouseDown={() => setIsSeeking(true)}
                        onMouseUp={(e) => {
                          const newTime = parseFloat(e.target.value);
                          audioRefs.current[podcast.id].currentTime = newTime;
                          setProgress((prev) => ({
                            ...prev,
                            [podcast.id]: {
                              ...(prev[podcast.id] || {}),
                              currentTime: newTime,
                            },
                          }));
                          setIsSeeking(false);
                        }}
                        onChange={(e) => {
                          const newTime = parseFloat(e.target.value);
                          setProgress((prev) => ({
                            ...prev,
                            [podcast.id]: {
                              ...(prev[podcast.id] || {}),
                              currentTime: newTime,
                            },
                          }));
                        }}
                      />
                      <span className="text-sm text-gray-400">
                        {formatTime(progress[podcast.id]?.currentTime || 0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleLoadMorePodcasts}
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

// <div className="bg-[#01222e] p-[200px]  text-2xl min-h-[40vh]"></div>;
