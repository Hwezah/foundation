export async function fetchData(
  URL,
  setIsLoading,
  setError,
  setTrends,
  pageToken = ""
) {
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

// api.js
export function YouTubeSearchApi(description, pageToken = "") {
  const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    description
  )}&maxResults=50&pageToken=${pageToken}&type=video&key=${API_KEY}`;
}

export function PodcastSearchApi(
  search_query,
  API_KEY = "8bdff6c6a5a94d2d9f43c1ad32b5d19e"
) {
  return `https://listen-api.listennotes.com/api/v2/search?q=${search_query}&type=episode&sort_by_date=0&len_min=0&len_max=0&only_in=title,description,fulltext&offset=0&safe_mode=0&episode_count_max=10`;
}
