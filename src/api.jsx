export async function fetchVideos(
  description,
  setIsLoading,
  setError,
  setTrends
) {
  if (!description.trim()) return; // Prevent empty searches

  const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    description
  )}&maxResults=50&type=video&key=${API_KEY}`;

  try {
    setIsLoading(true);
    setError("");

    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(
        ":) Something went wrong fetching your foundation, please try again."
      );
    }

    const data = await response.json();
    if (data.response === "False") {
      throw new Error(
        ":) Cannot find requested foundation, try another search."
      );
    }

    setTrends(data.items || []);
    localStorage.setItem("trends", JSON.stringify(data.items));
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
}
