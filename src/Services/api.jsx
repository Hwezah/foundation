export async function fetchData(URL, endpoint) {
  const response = await fetch(URL, endpoint);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.nextPageToken) {
    localStorage.setItem("nextPageToken", data.nextPageToken);
  } else {
    localStorage.removeItem("nextPageToken"); // No more pages
  }
  return data; // Return the fetched data
}

// api.js

// export async function fetchData(
//   URL,
//   endpoint,
//   setIsLoading,
//   setError,
//   setSermons,
//   pageToken = ""
// ) {
//   try {
//     setError(null); // Reset error state before fetching
//     setIsLoading(true);
//     const response = await fetch(URL, endpoint);
//     if (!response.ok) {
//       throw new Error(`Error ${response.status}: Unable to fetch data.`);
//     }
//     const data = await response.json();
//     //     if (response.ok) {
//       // Update sermons with the new results
//       setSermons((prevsermons) =>
//         pageToken === "" ? data.items : [...prevsermons, ...data.items]
//       );

//       // Store the nextPageToken in localStorage for the next request
//       if (data.nextPageToken) {
//         localStorage.setItem("nextPageToken", data.nextPageToken);
//       } else {
//         localStorage.removeItem("nextPageToken"); // No more pages
//       }
//     } else {
//       throw new Error(data.error.message);
//     }
//     return data;
//   } catch (error) {
//     setError(error.message);
//   } finally {
//     setIsLoading(false);
//   }
// }
