export async function fetchVideos(
  description,
  setIsLoading,
  setError,
  setTrends,
  pageToken = ""
) {
  setIsLoading(true);
  setError(null); // Clear previous errors
  const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    description
  )}&maxResults=50&pageToken=${pageToken}&type=video&key=${API_KEY}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      // Update trends with the new results
      setTrends((prevTrends) =>
        pageToken === "" ? data.items : [...prevTrends, ...data.items]
      );

      // Store the nextPageToken in localStorage for the next request
      if (data.nextPageToken) {
        localStorage.setItem("nextPageToken", data.nextPageToken);
      } else {
        localStorage.removeItem("nextPageToken"); // No more pages
      }
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}
