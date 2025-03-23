// import { strokeColor } from "./App";
import { useEffect } from "react";
import { useSearch } from "./SearchContext";
import { Loader } from "./trending";
import { VideoEmbed } from "./trending";
export default function Hero() {
  const { isLoading, setIsLoading } = useSearch();
  const { selectedVideo } = useSearch();
  const { description } = useSearch();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading for 3 seconds...experimental
  }, []);

  return (
    <div className="relative xl:h-[70vh] xl:flex xl:justify-between items-center  ">
      {/* If still loading, show the Loader */}
      {isLoading ? (
        <Loader />
      ) : !selectedVideo ? (
        // Show fallback video while waiting for the selected video
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source
            src="public\Assets\5875774-uhd_3840_2160_24fps.mp4" // Ensure the path is correct
            type="video/mp4"
          />
        </video>
      ) : (
        // Once the selected video is available, show the selected video
        <>
          <div className="block sm:hidden xl:block w-[40%] h-full">
            <BibleStudy />
          </div>
          <div className="  relative h-[40rem] xl:h-full xl:w-full">
            <div className="absolute top-1/2 left-10 -translate-y-1/2 transform cursor-pointer  rounded-full bg-white p-4 text-white transition hover:bg-gray-100">
              {/* Left arrow icon */}
              <svg
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
                  fill="#0F0F0F"
                />
              </svg>
            </div>

            <VideoEmbed
              height="100%"
              className="rounded-none shadow-none "
              videoId={selectedVideo.id.videoId}
              title={selectedVideo.snippet.title}
            />
            <div className="absolute top-1/2 right-10 -translate-y-1/2 transform cursor-pointer rounded-full p-4 bg-white text-white transition hover:bg-gray-100">
              {/* Right arrow icon */}
              <svg
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
                  fill="#0F0F0F"
                />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Controls for video */}
      {selectedVideo && selectedVideo.snippet && (
        // Show description or title if the selected video exists
        <FoundationFeed
          description={description}
          title={selectedVideo.snippet.title}
        />
      )}
    </div>
  );
}
function FoundationFeed({ description, title }) {
  return (
    <div className="xl:max-w-[30%]  w-full bg-[#01212c] gap-6 xl:p-10 xl:pt-0 p-6 pt-0 h-full xl:overflow-y-auto">
      <div className=" xl:w-full ">
        <div className="sticky top-0 bg-[#01212c] pt-6 mb-4">
          <h2 className="xl:text-4xl sm:text-2xl md:text-3xl font-black mb-3">
            <span className="text-[#4a5759]">Following,</span> {description}'s
            Foundation.
          </h2>
          <h3 className="mb-2 bg-[#4a5759] p-2 px-4">
            <span className="xl:text-3xl sm:text-2xl text-white font-extrabold mr-4">
              Sermon:
            </span>
            <span className="font-bold xl:text-2xl text-lg text-[#01212c]">
              {title}...
            </span>
          </h3>
        </div>
        <p className="leading-relaxed">
          Luke 1:1-40 (KJV) 1 Forasmuch as many have taken in hand to set forth
          in order a declaration of those things which are most surely believed
          among us, 2 Even as they delivered them unto us, which from the
          beginning were eyewitnesses, and ministers of the word; 3 It seemed
          good to me also, having had perfect understanding of all things from
          the very first, to write unto thee in order, most excellent
          Theophilus, 4 That thou mightest know the certainty of those things,
          wherein thou hast been instructed. The Birth of John the Baptist
          Foretold 5 There was in the days of Herod, the king of Judaea, a
          certain priest named Zacharias, of the course of Abia: and his wife
          was of the daughters of Aaron, and her name was Elisabeth. 6 And they
          were both righteous before God, walking in all the commandments and
          ordinances of the Lord blameless. 7 And they had no child, because
          that Elisabeth was barren, and they both were now well stricken in
          years. 8 And it came to pass, that while he executed the priest’s
          office before God in the order of his course, 9 According to the
          custom of the priest’s office, his lot was to burn incense when he
          went into the temple of the Lord. 10 And the whole multitude of the
          people were praying without at the time of incense. 11 And there
          appeared unto him an angel of the Lord standing on the right side of
          the altar of incense. 12 And when Zacharias saw him, he was troubled,
          and fear fell upon him. 13 But the angel said unto him, Fear not,
          Zacharias: for thy prayer is heard; and thy wife Elisabeth shall bear
          thee a son, and thou shalt call his name John. 14 And thou shalt have
          joy and gladness; and many shall rejoice at his birth. 15 For he shall
          be great in the sight of the Lord, and shall drink neither wine nor
          strong drink; and he shall be filled with the Holy Ghost, even from
          his mother’s womb. 16 And many of the children of Israel shall he turn
          to the Lord their God. 17 And he shall go before him in the spirit and
          power of Elias, to turn the hearts of the fathers to the children, and
          the disobedient to the wisdom of the just; to make ready a people
          prepared for the Lord. 18 And Zacharias said unto the angel, Whereby
        </p>
      </div>
      {/* <div className="block xl:hidden w-[40%]">
        <BibleStudy />
      </div> */}
    </div>
  );
}

function BibleStudy() {
  return (
    <div className="bg-[#01212c] w-full  p-6 xl:p-10 h-full">
      <p>
        {" "}
        repellat! Vel ducimus velit similique sint soluta deserunt dolor ullam
        dolorum odio optio? Assumenda autem non nulla. Id, ex in? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Reiciendis, porro repellat!
        Vel ducimus velit similique sint soluta deserunt dolor ullam dolorum
        odio optio? Assumenda autem non nulla. Id, ex in? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Reiciendis, porro repellat! Vel
        ducimus velit similique sint soluta deserunt dolor ullam dolorum odio
        optio? Assumenda autem non nulla. Id, ex in? Lorem ipsum dolor sit amet
      </p>
    </div>
  );
}
