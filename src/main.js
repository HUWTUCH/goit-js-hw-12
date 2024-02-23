import { getSearchPhotoAPI } from './js/pixabay-api.js'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { photoTemplate } from './js/render-function.js';


const refs = {
  formEL: document.querySelector('.js-search-form'),
  loaderEl: document.querySelector('.loader'),
  galleryList: document.querySelector('.gallery'),
  buttonLoad: document.querySelector('.btn-load')
}
let lastSearchData = null;
refs.loaderEl.style.display = "none";
refs.formEL.addEventListener('submit', async (e)=>{
  e.preventDefault()
  refs.galleryList.innerHTML = '';
  const userSubmit = e.target.elements.query.value.trim();
  refs.loaderEl.style.display = "block";
  try {
    const data = await getSearchPhotoAPI(userSubmit);
    lastSearchData = userSubmit;
    if (!data.hits.length){
      iziToast.show({
        message: "Sorry, there are no images matching your search query. Please try again!",
        backgroundColor: 'red',
        position: 'topRight'
      })
      refs.galleryList.innerHTML = '';
    } else {
      photoTemplate(data);
      if (data.hits.length >= 15) {
        refs.buttonLoad.style.display = "block"
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.show({
      message: "An error occurred while fetching images. Please try again later.",
      backgroundColor: 'red',
      position: 'topRight'
    });
  }
  finally {
    refs.loaderEl.style.display = "none";
  }
  e.target.reset()
})
refs.buttonLoad.addEventListener('click', async (e) => {
  if (!lastSearchData) {
    return;
  }
  const currentPage = Math.ceil(refs.galleryList.children.length / 15) + 1;
  refs.loaderEl.style.display = "block";
  try {
    const data = await getSearchPhotoAPI(lastSearchData, currentPage);
    photoTemplate(data);
    if (data.hits.length >= 15) {
      const cardHeight = refs.galleryList.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    refs.buttonLoad.style.display = "none"
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      backgroundColor: 'blue',
      position: 'topRight'
    });
  } finally {
    refs.loaderEl.style.display = 'none';
  }
})