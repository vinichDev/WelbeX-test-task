import axios from "axios";

export const fetchData = async () => {
  try {
    const searchParams = window.location.search;
    const response = await axios.get(`http://localhost:5000/table${searchParams}`);
    return await response;
  } catch (e) {
    console.error(e);
  }
}
