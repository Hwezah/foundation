import { useState } from "react";
import { useSearch } from "./SearchContext";
import fetchSermons from "./sermons";
import React, { memo } from "react";
import Podcasts from "./Podcasts";
import Sermons from "./sermons";

function Trending() {
  const { description, setError, setIsLoading, setSermons } = useSearch(); // Use context for shared state
  const [selectedCategory, setSelectedCategory] = useState("Sermons");
  console.log("Description from useSearch in Trending:", description);
  async function handleLoadMore() {
    const nextPageToken = localStorage.getItem("nextPageToken") || "";
    if (!description || description.trim() === "") {
      setError("Please enter a valid search term.");
      return;
    }

    if (nextPageToken || selectedCategory === "Sermons") {
      const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY"; // Replace with your actual API key
      const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        description
      )}&maxResults=50&type=video&key=${API_KEY}`;

      try {
        setIsLoading(true);
        await fetchSermons(
          URL,
          setIsLoading,
          setError,
          setSermons,
          nextPageToken
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("No next page available.");
    }
  }

  return (
    <div>
      <div className="lg:pt-6 px-2 pt-6 xl:pb-1 xl:px-10 md:px-4 sm:px-2 lg:px-6 xl:pt-10">
        <span className="text-xl md:text-3xl font-black tracking-wide pb-1">
          {selectedCategory}.
        </span>
      </div>
      <ContentBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory === "Podcasts" && <Podcasts category={description} />}
      {selectedCategory === "Sermons" && <Sermons description={description} />}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
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
    </div>
  );
}

export default memo(Trending);

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
    <div className="flex pb-2 xl:pb-3 xl:px-10 md:px-4 sm:px-2 lg:px-6 overflow-x-auto justify-between gap-4 text-sm lg:text-md font-bold scrollbar-hidden">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
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
