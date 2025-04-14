import { useState, useEffect, useRef } from "react";
export default function Podcasts({ category }) {
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(false);
  const [error, setError] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [playingPodcastId, setPlayingPodcastId] = useState(null);
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
      }
    }
  };

  return (
    <div className=" xl:pb-1 xl:px-10 md:px-4 sm:px-2 lg:px-6 ">
      {isLoadingPodcasts && <p>Loading podcasts...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div className=" grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] min-h-[40vh] gap-4 gap-y-2 md:gap-y-4">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-[#01222e] p-4 lg:rounded shadow-md text-white h-[8rem]"
          >
            <h4 className="text-md font-semibold truncate">
              {podcast.title_original}
            </h4>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={podcast.image}
                  alt={podcast.title_original}
                  className=" rounded  object-cover"
                />
              </div>
              <div className="w-full">
                <p className="text-sm text-gray-400 font-medium relative max-w-[90%]">
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
                    onClick={() => handlePlayPause(podcast.id, podcast.audio)}
                    className=""
                  >
                    {playingPodcastId === podcast.id ? (
                      <svg
                        className="absolute bottom-[-2px] ml-0.25"
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
                        className="absolute bottom-[-2px] ml-0.25"
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// <div className="bg-[#01222e] p-[200px]  text-2xl min-h-[40vh]"></div>;
