export default async function fetchVideos(
  description,
  setIsLoading,
  setTrends
) {
  //   const [description, setDescription] = useSearch();
  //   const { isLoading, setIsLoading } = useSearch();
  //   const [trends, setTrends] = useSearch();
  const API_KEY = "AIzaSyCSs5XLks6Sod6cQgauGVNW7Wf4asuZ_Jc";
  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    description
  )}&maxResults=14&type=video&key=${API_KEY}`;

  try {
    setIsLoading(true);
    const response = await fetch(URL);
    const data = await response.json();
    console.log("API Response:", data);
    //setTrends array gets filled with data(videos) from the API
    //if no data, then reverts to the original empty array.
    setTrends(data.items || []);
    setIsLoading(false);
    // Store trends in localStorage(trends data is converted back to a string so the browser can use it)
    localStorage.setItem("trends", JSON.stringify(data.items));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
  }
}
