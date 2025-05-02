export async function fetchData(URL, endpoint) {
  const response = await fetch(URL, endpoint);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);

  // Handle YouTube's pagination
  if (data.nextPageToken) {
    localStorage.setItem("nextPageToken", data.nextPageToken);
  } else {
    localStorage.removeItem("nextPageToken");
  }

  // Handle ListenNotes pagination
  if (data.next_offset !== undefined) {
    localStorage.setItem("nextOffset", data.next_offset);
  } else {
    localStorage.removeItem("nextOffset");
  }

  return data;
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
