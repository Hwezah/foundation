import { useState, useEffect } from "react";
import { useSearch } from "./SearchContext";
export default function Trending() {
  const {
    description,
    isLoading,
    setIsLoading,
    selectedVideo,
    setSelectedVideo,
    trends,
    setTrends,
  } = useSearch();
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [error, setError] = useState("");

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
    const controller = new AbortController();
    if (description.trim() === "") {
      setTrends([]);
      localStorage.removeItem("trends");
      return;
    }

    async function fetchVideos() {
      const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
      const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        description
      )}&maxResults=50&type=video&key=${API_KEY}`;

      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(
            ":) Something went wrong fetching your foundation, please try again."
          );
        }
        const data = await response.json();

        if (data.response === "False")
          throw new Error(
            ":) Cannot find requested foundation, try another search."
          );
        setTrends(data.items || []);
        localStorage.setItem("trends", JSON.stringify(data.items));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
    return () => {
      controller.abort();
    };
  }, [description, setIsLoading]);

  useEffect(() => {
    if (selectedVideo) {
      document.title = `Watching | ${description} - ${selectedVideo.snippet.title}`;
    }

    // return () => {
    //   // Reset selectedVideo when description changes or on reload
    //   setSelectedVideo(null);
    //   // Reset title to default
    //   // Cleanup function
    //   document.title = "Foundation";
    // };
  }, [selectedVideo, description]);

  return (
    <div>
      <div className="xl:p-10 md:p-4 lg:p-6 p-4">
        <h2 className="text-xl md:text-3xl font-black tracking-wide lg:pb-2">
          Trends. {description ? `${description}'s foundation,` : ""}
        </h2>
        <ContentBar />
      </div>

      <ul className=" xl:p-10 md:p-4 sm:p-2 lg:p-6 !pt-0 grid sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 items-start  relative">
        {isLoading ? (
          <Loader />
        ) : trends.length > 0 ? (
          trends.map((video) => (
            <VideoItem
              onClick={() => setSelectedVideo(video)}
              key={
                video.id.videoId || video.id.channelId || video.id.playlistId
              }
              video={video}
              isPlaying={
                playingVideoId ===
                (video.id.videoId || video.id.channelId || video.id.playlistId)
              }
              onPlay={() =>
                setPlayingVideoId(
                  video.id.videoId || video.id.channelId || video.id.playlistId
                )
              }
            />
          ))
        ) : (
          <ErrorMessage message={error} />
        )}
      </ul>
    </div>
  );
}
function ErrorMessage({ message }) {
  return <p className="ml-4">{message}</p>;
}
function VideoItem({ video, onClick, onPlay, isPlaying }) {
  const videoId =
    video?.id?.videoId || video?.id?.channelId || video?.id?.playlistId;
  if (!videoId) return null;

  return (
    <li className="mb-8 cursor-pointer relative flex " onClick={onClick}>
      {!isPlaying ? (
        <>
          <div
            className="w-full h-[210px] bg-cover bg-center md:rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
            }}
          >
            {/* Other content can go inside here */}
          </div>

          <button
            // onClick={() => {
            //   onPlay();
            //   // Prevent triggering `onClick` when clicking the button
            // }}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center rounded-full bg-opacity-50 p-4"
          >
            <svg
              fill="#ffffff"
              height="50px"
              width="50px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 459 459"
              xml:space="preserve"
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
        </>
      ) : (
        <VideoEmbed videoId={video.id.videoId} title={video.snippet.title} />
      )}
      <h3 className="truncate absolute bottom-[-35px] max-w-full left-0 w-full p-2 text-sm lg:text-lg ">
        {video.snippet.title}
      </h3>
    </li>
  );
}

export function VideoEmbed({
  videoId,
  title,
  width = "100%",
  height = "auto",
  className = "",
}) {
  return (
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
      title={title}
      className={` shadow-none hover:shadow-none aspect-video focus:outline-none ${className} `}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}

function ContentBar() {
  return (
    <div className="flex overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hidden gap-4 justify-between items-center md:pt-3 pt-2 text-xs md:text-sm xl:text-base  font-bold">
      <div>
        <a
          href="/sermons"
          className="bg-amber-400 text-[#000608] md:px-2.5 md:py-1.5 px-2 py-1 block rounded-lg"
        >
          Sermons
        </a>
      </div>
      <div>
        <a
          href="/podcasts"
          className="bg-[#000608] md:px-2.5 md:py-1.5 px-2 py-1 block rounded-lg"
        >
          Podcasts
        </a>
      </div>
      <div>
        <a
          href="/music"
          className="bg-[#000608] md:px-2.5 md:py-1.5 px-2 py-1 block rounded-lg"
        >
          Music
        </a>
      </div>
      <div>
        <a
          href="/bible-studies"
          className="bg-[#000608] md:px-2.5 md:py-1.5 px-2 py-1 block rounded-lg"
        >
          Bible Studies
        </a>
      </div>
      <div>
        <a
          href="/prayer-fellowship"
          className="bg-[#000608] md:px-2.5 md:py-1.5 px-2 py-1 block rounded-lg"
        >
          Prayer
        </a>
      </div>
      <div>
        <a
          href="/live-feed"
          className="bg-[#000608] md:px-2.5 md:py-1.5 px-2 py-1 block rounded-lg"
        >
          Live-feed
        </a>
      </div>
      <div>
        <a
          href="/Testimonies"
          className="bg-[#000608] md:px-2.5 md:py-1.5 px-2 py-1 block rounded-lg"
        >
          Testimonies
        </a>
      </div>
    </div>
  );
}
