import { getSearchPhotoAPI } from './js/pixabay-api.js'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { photoTemplate } from './js/render-function.js';

const refs = {
  formEL: document.querySelector('.js-search-form'),
  loaderEl: document.querySelector('.loader'),
  galleryList: document.querySelector('.gallery')
}
refs.loaderEl.style.display = "none";
refs.formEL.addEventListener('submit', async (e)=>{
  e.preventDefault()
  refs.galleryList.innerHTML = '';
  const userSubmit = e.target.elements.query.value.trim();
  refs.loaderEl.style.display = "block";
  getSearchPhotoAPI(userSubmit).then(data => {
    if (!data.hits.length){
      iziToast.show({
        message: "Sorry, there are no images matching your search query. Please try again!",
        backgroundColor: 'red',
        position: 'topRight'
      })
      refs.galleryList.innerHTML = '';
    } else {
      photoTemplate(data);
    }
  })
    .finally(()=> {
      refs.loaderEl.style.display = "none";
    })
  e.target.reset()
})