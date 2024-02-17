
export function getSearchPhotoAPI(userSymbol)  {
  const KEY_API = '42320428-e8ed9ab9e474091db19815d3a'

  const listParameters = {
    key: KEY_API,
    q: userSymbol,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  }

  const queryString = new URLSearchParams(listParameters).toString();
  const BASE_URL = `https://pixabay.com/api/?${queryString}`

  return fetch(BASE_URL, {
    method: "GET",
    mode: "cors",
  }).then(res=>res.json());
}