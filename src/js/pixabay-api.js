import axios from "axios";

export async function getSearchPhotoAPI(userSymbol, page = 1)  {
  const KEY_API = '42320428-e8ed9ab9e474091db19815d3a'

  const listParameters = {
    key: KEY_API,
    q: userSymbol,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  }

  try {
    const queryString = new URLSearchParams(listParameters).toString();
    const BASE_URL = await axios.get(`https://pixabay.com/api/?${queryString}`)
    return BASE_URL.data
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}