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
    <div className="relative h-[75vh] xl:flex xl:justify-between items-center overflow-hidden ">
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
          <div className="hidden xl:block h-full ">
            <Tools />
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
    <div className="xl:max-w-[30%]  w-full bg-[#01212c] gap-6  xl:pt-0 xl:p-6 h-full overflow-y-auto scrollbar-hidden">
      <div className=" xl:w-full ">
        <div className="sticky top-0 bg-[#01212c] xl:pt-6 mb-4">
          <h2 className="hidden xl:block xl:text-4xl sm:text-2xl md:text-3xl font-black mb-3 pt-6  px-4 pb-0  xl:p-0">
            <span className="text-[#4a5759] uppercase">Following,</span>{" "}
            <spa>{description}'s Foundation.</spa>
          </h2>
          <div className="flex justify-between bg-[#4a5759] mb-2 p-4 xl:p-6 items-center">
            <h3>
              <span className="xl:text-3xl sm:text-2xl text-white font-extrabold mr-4">
                SERMON:
              </span>
              <span className="font-bold xl:text-2xl lg:text-lg text-[#01212c] ">
                {title}...
              </span>
            </h3>
            <div className="xl:hidden">
              <Tools />
            </div>
          </div>
        </div>
        <p className="leading-relaxed px-4 lg:px-6 xl:px-0">
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
        <Tools />
      </div> */}
    </div>
  );
}

function Tools() {
  return (
    <div className="xl:bg-[#01212c] xl:p-4 h-full flex gap-2 xl:flex-col xl:justify-between">
      <svg
        height={"44px"}
        width={"44px"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
            opacity="0.5"
            d="M2 9C2 5.22876 2 3.34315 3.17157 2.17157C4.34315 1 6.22876 1 10 1H14C17.7712 1 19.6569 1 20.8284 2.17157C22 3.34315 22 5.22876 22 9V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V9Z"
            fill="#fff"
          ></path>{" "}
          <path
            d="M6 12.9108V7.49649C6 6.67251 6.66539 6.00074 7.48717 6.06091C7.99967 6.09844 8.55592 6.16228 9 6.27079C9.8239 6.4721 10.851 6.9711 11.4646 7.29318C11.4763 7.29933 11.4881 7.30525 11.5 7.31094V15.7262C11.4975 15.7249 11.495 15.7236 11.4926 15.7223C10.8826 15.4009 9.83655 14.8896 9 14.6852C8.56248 14.5783 8.01608 14.5147 7.50991 14.477C6.67934 14.4151 6 13.7437 6 12.9108Z"
            fill="#01212c"
          ></path>{" "}
          <path
            d="M12.5 15.7262C12.5025 15.7249 12.505 15.7236 12.5074 15.7223C13.1174 15.4009 14.1634 14.8896 15 14.6852C15.4375 14.5783 15.9839 14.5147 16.4901 14.477C17.3207 14.4151 18 13.7437 18 12.9108V7.45154C18 6.64543 17.3619 5.98216 16.5568 6.0217C15.9405 6.05197 15.2404 6.12099 14.7 6.27079C13.9685 6.47356 13.0752 6.95027 12.5219 7.27042C12.5147 7.27462 12.5073 7.27874 12.5 7.28277V15.7262Z"
            fill="#01212c"
          ></path>{" "}
        </g>
      </svg>
      <svg
        height={"44px"}
        width={"44px"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="[#01212c]"
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
            opacity="0.5"
            d="M11.9993 2C16.7133 2 19.0704 2 20.5348 3.46447C21.2923 4.22195 21.658 5.21824 21.8345 6.65598V10H2.16406V6.65598C2.3406 5.21824 2.70628 4.22195 3.46377 3.46447C4.92823 2 7.28525 2 11.9993 2Z"
            fill="#fff"
          ></path>{" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V15.1893L10.0303 13.9697C9.73744 13.6768 9.26256 13.6768 8.96967 13.9697C8.67678 14.2626 8.67678 14.7374 8.96967 15.0303L11.4697 17.5303C11.6103 17.671 11.8011 17.75 12 17.75C12.1989 17.75 12.3897 17.671 12.5303 17.5303L15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697C14.7374 13.6768 14.2626 13.6768 13.9697 13.9697L12.75 15.1893V11Z"
            fill="#01212c"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
}
