import { useState, useEffect, useRef } from "react";
export default function Podcasts({ category }) {
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(false);
  const [error, setError] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [playingPodcastId, setPlayingPodcastId] = useState(null);
  const [progress, setProgress] = useState({});
  const [isSeeking, setIsSeeking] = useState(false);

  const audioRefs = useRef({}); // Store references to audio elements

  async function PodcastsApi() {
    setIsLoadingPodcasts(true);
    setError(null); // setError(null); // Clear previous errors
    const search_query = category;
    const API_KEY = "8bdff6c6a5a94d2d9f43c1ad32b5d19e";
    const URL = `https://listen-api.listennotes.com/api/v2/search?q=${search_query}&type=episode&sort_by_date=0&len_min=0&len_max=0&only_in=title,description,fulltext&offset=0&safe_mode=0&episode_count_max=10`;

    try {
      const response = await fetch(URL, {
        headers: {
          "X-ListenAPI-Key": API_KEY,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      const data = await response.json();
      setPodcasts(data.results || []);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadingPodcasts(false);
    }
  }
  useEffect(() => {
    if (category) {
      PodcastsApi();
    }
  }, [category]);

  const handlePlayPause = (podcastId, audioUrl) => {
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
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className=" xl:pb-1 xl:px-10 md:px-4 sm:px-2 lg:px-6 ">
      {isLoadingPodcasts && <p>Loading podcasts...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div className=" grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))]  gap-4 gap-y-2 md:gap-y-4 ">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-[#01222e] p-4 lg:rounded shadow-md text-white relative max-h-[8.5rem]"
          >
            <h4 className="text-md font-semibold truncate mr-4">
              {podcast.title_original}
            </h4>
            <div className="flex gap-4 items-center w-fit">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={podcast.image}
                  alt={podcast.title_original}
                  className=" rounded  object-cover"
                />
              </div>
              <div className="">
                <p className="text-sm text-gray-400 font-medium relative ">
                  {podcast.description_original
                    ? podcast.description_original
                        .replace(/<[^>]*>/g, "") // Remove HTML tags
                        .slice(0, 70) + "..." // Limit to 100 characters and add "..."
                    : "No description available."}
                  <audio
                    ref={(el) => (audioRefs.current[podcast.id] = el)} // Store reference to the audio element
                    src={podcast.audio}
                  />
                  <button
                    onClick={() => handlePlayPause(podcast.id)}
                    className=""
                  >
                    {playingPodcastId === podcast.id ? (
                      <svg
                        className="absolute bottom-[-4px] ml-0.25"
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
                        className="absolute bottom-[-4px] ml-0.25"
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
                </p>
                <a
                  href={podcast.audio} // Use the audio URL as the href
                  download // Add the download attribute
                  className="text-blue-400 underline mt-1 ml-2"
                >
                  <svg
                    className="absolute top-4  right-4"
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
                </a>
                {playingPodcastId === podcast.id && (
                  <div className="">
                    <div className="flex items-center gap-2 mt-[-1.4rem]">
                      {/* <span className="text-sm text-gray-400 ">
                        {formatTime(progress[podcast.id]?.currentTime || 0)}
                      </span> */}
                      <input
                        type="range"
                        className="custom-range w-full h-[2px] cursor-pointer"
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
    </div>
  );
}

// <div className="bg-[#01222e] p-[200px]  text-2xl min-h-[40vh]"></div>;
