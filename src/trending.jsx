import { useState, useEffect } from "react";
import { useSearch } from "./constants";
export default function Trending() {
  const { description } = useSearch();
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    if (description.trim() === "") {
      setTrends([]);
      return;
    } // Prevent empty searches
    async function fetchVideos() {
      const API_KEY = "AIzaSyCNyHlY3nfI0eJYR7_xHTobtrRTX3puk94";
      const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        description
      )}&maxResults=14&type=video&key=${API_KEY}`;

      try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log("API Response:", data);
        console.log(data.items); // Debugging
        setTrends(data.items || []); // Update trends state
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    }

    fetchVideos();
  }, [description]); // Fetch videos when `description` changes

  return (
    <div className="h-screen">
      <div>
        <h2 className="text-3xl font-black p-12 pb-2 ">
          <span className="tracking-wide">Trends.</span>
          <p className="text-2xl text-gray-600">
            {description ? `${description}'s foundation.` : ""}
          </p>
        </h2>
      </div>

      {/* <p className="text-xl text-gray-600 pl-8 font-bold">
          ...Build your foundation with messages from {description}
        </p> */}
      <ul className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-start px-8">
        {/* <li>
            <img
              src="https://picsum.photos/1600/900"
              className="rounded-lg shadow-lg"
            />
          </li>
          <li>
            <img
              src="https://picsum.photos/1600/900"
              className="rounded-lg shadow-lg"
            />
          </li>
          <li>
            <img
              src="https://picsum.photos/1600/900"
              className="rounded-lg shadow-lg"
            />
          </li>
          <li>
            <img
              src="https://picsum.photos/1600/900"
              className="rounded-lg shadow-lg"
            />
          </li> */}

        {trends.length > 0 ? (
          trends.map((video) => {
            const videoId =
              video.id.videoId || video.id.channelId || video.id.playlistId;
            return videoId ? (
              <li
                key={video.id.videoId}
                className="mb-4 cursor-pointer relative flex"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute top-[50%] left-[50%] translate-[-50%] flex items-center justify-center rounded-lg">
                  <svg
                    fill="#000000"
                    height="200px"
                    width="200px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
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
                      <path
                        id="XMLID_497_"
                        d="M292.95,152.281L52.95,2.28c-4.625-2.891-10.453-3.043-15.222-0.4C32.959,4.524,30,9.547,30,15v300 c0,5.453,2.959,10.476,7.728,13.12c2.266,1.256,4.77,1.88,7.272,1.88c2.763,0,5.522-0.763,7.95-2.28l240-149.999 c4.386-2.741,7.05-7.548,7.05-12.72C300,159.829,297.336,155.022,292.95,152.281z M60,287.936V42.064l196.698,122.937L60,287.936z"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <h3 className="font-semibold absolute bottom-0 left-0 w-full p-2 text-sm z-10">
                  {video.snippet.title.split(" ").slice(0, 4).join(" ")}
                  {video.snippet.title.split(" ").length > 4 ? "..." : ""}
                </h3>
              </li>
            ) : null;
          })
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}
