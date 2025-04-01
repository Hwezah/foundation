import { useState } from "react";
import { useSearch } from "./SearchContext";

export default function Trending() {
  const { description, isLoading, trends, setSelectedVideo, error } =
    useSearch();

  const [playingVideoId, setPlayingVideoId] = useState(null);

  return (
    <div>
      <div className=" lg:pt-6 px-2 pt-6 xl:pb-1 xl:px-10 md:px-4 sm:px-2 lg:px-6 xl:pt-10 ">
        <h2 className="text-xl md:text-3xl font-black tracking-wide pb-1 ">
          Trends.{" "}
          {description && (
            <h2 className="text-[#4a5759] mt-1">
              {" "}
              {/* Add any class here */}
              {`${description}'s foundation.`}
            </h2>
          )}
        </h2>
      </div>
      <ContentBar />

      <ul className="xl:p-10 md:p-4 sm:p-2 lg:p-6 !pt-0 grid sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
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
  height = "200px",
  className = "",
}) {
  return (
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
      title={title}
      className={` shadow-none hover:shadow-none focus:outline-none ${className} `}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
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
    <div className="flex pb-2 xl:pb-3 xl:px-10 md:px-4 sm:px-2 lg:px-6  overflow-x-auto justify-between gap-4 text-sm lg:text-md font-bold scrollbar-hidden">
      {categories.map((category) => (
        <a
          key={category}
          href={`/${category.toLowerCase().replace(" ", "-")}`}
          className="bg-[#01222e] text-[#78898b] px-2  py-1 lg:px-3 lg:py-1.5 rounded-sm whitespace-nowrap font-semibold"
        >
          {category}
        </a>
      ))}
    </div>
  );
}
