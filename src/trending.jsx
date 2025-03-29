import { useState, useEffect } from "react";
import { useSearch } from "./SearchContext";

export default function Trending() {
  const {
    description,
    isLoading,
    setIsLoading,
    trends,
    setTrends,
    setSelectedVideo,
    error,
  } = useSearch();

  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    // Load trends from localStorage on mount
    const storedTrends = localStorage.getItem("trends");
    if (storedTrends) {
      try {
        setTrends(JSON.parse(storedTrends));
      } catch {
        setTrends([]);
      }
    }
  }, []);

  useEffect(() => {
    // Store updated trends in localStorage
    localStorage.setItem("trends", JSON.stringify(trends));
  }, [trends]);

  return (
    <div>
      <div className="xl:p-10 md:p-4 lg:p-6 p-4">
        <h2 className="text-xl md:text-3xl font-black tracking-wide lg:pb-2">
          Trends. {description && `${description}'s foundation`}
        </h2>
        <ContentBar />
      </div>

      <ul className="xl:p-10 md:p-4 sm:p-2 lg:p-6 !pt-0 grid sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
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
    </div>
  );
}

function VideoItem({ video, onClick, onPlay, isPlaying }) {
  const videoId = video?.id?.videoId;
  if (!videoId) return null;

  return (
    <li className="mb-8 cursor-pointer relative flex" onClick={onClick}>
      {!isPlaying ? (
        <div
          className="w-full h-[210px] bg-cover bg-center md:rounded-lg shadow-lg"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
          }}
        >
          <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            ▶
          </button>
        </div>
      ) : (
        <VideoEmbed videoId={videoId} title={video.snippet.title} />
      )}
      <h3 className="truncate absolute bottom-[-35px] w-full p-2 text-sm lg:text-lg">
        {video.snippet.title}
      </h3>
    </li>
  );
}

export function VideoEmbed({ videoId, title }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
      title={title}
      className="shadow-none aspect-video focus:outline-none"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
}

function ErrorMessage({ message }) {
  return <p className="ml-4">{message}</p>;
}

export function Loader() {
  return (
    <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
  );
}

function ContentBar() {
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
    <div className="flex overflow-x-auto gap-4 text-sm font-bold">
      {categories.map((category) => (
        <a
          key={category}
          href={`/${category.toLowerCase().replace(" ", "-")}`}
          className="bg-[#000608] px-2 py-1 rounded-sm"
        >
          {category}
        </a>
      ))}
    </div>
  );
}
