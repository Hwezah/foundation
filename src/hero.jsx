// import { strokeColor } from "./App";
export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full bg-gray-200">
      <div className="absolute top-1/2 left-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-4 text-white transition hover:bg-gray-100">
        <svg
          height="24px"
          width="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
              fill="#0F0F0F"
            ></path>{" "}
          </g>
        </svg>
      </div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-4 text-white transition hover:bg-gray-100">
        <svg
          height="24px"
          width="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
              fill="#0F0F0F"
            ></path>{" "}
          </g>
        </svg>
      </div>
      <div className="h-full w-full ">
        <img
          className="h-full w-full object-cover"
          src=" https://picsum.photos/1600/900 "
          //  src="/Assets/pexels-jibarofoto-13963623.jpg"

          alt="church thumbs"
        />
      </div>
      <div className="absolute top-[50%] left-[50%] translate-[-50%]">
        <svg
          width="256px"
          height="256px"
          viewBox="0 0 72 72"
          id="emoji"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="0.288"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="color"></g> <g id="hair"></g> <g id="skin"></g>{" "}
            <g id="skin-shadow"></g>{" "}
            <g id="line">
              {" "}
              <path
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M19.5816,55.6062 c0.4848,0.1782,1.0303,0.297,1.5758,0.297c0.8485,0,1.697-0.297,2.4242-0.7722l30-15.9793l0.303-0.297 c0.7879-0.7722,1.2121-1.7227,1.2121-2.7919c0-1.0692-0.4242-2.0791-1.2121-2.7919l-0.303-0.297l-30-16.0981 c-1.0909-0.8316-2.6667-1.0098-4-0.4752c-1.5152,0.594-2.4848,2.0791-2.4848,3.683v31.8397 C17.0967,53.5272,18.0664,55.0122,19.5816,55.6062z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    </div>
  );
}
