import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getSearchPhotoAPI } from './js/pixabay-api.js';
import { photoTemplate } from './js/render-function.js';

const appState = {
  lastSearchData: null,
};

const refs = {
  formEL: document.querySelector('.js-search-form'),
  loaderEl: document.querySelector('.loader'),
  galleryList: document.querySelector('.gallery'),
  buttonLoad: document.querySelector('.btn-load'),
  loaderMore: document.querySelector('.loader-more')
};

refs.loaderEl.style.display = "none";
refs.loaderMore.style.display = "none";

// Обробник події для форми пошуку
refs.formEL.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userSubmit = e.target.elements.query.value.trim();

  // Перевірка, чи не складається запит тільки з пробілів
  if (!userSubmit) {
    // Показ повідомлення про невалідний запит
    iziToast.show({
      message: "Please enter a valid search query.",
      backgroundColor: 'red',
      position: 'topRight'
    });
    return;
  }

  refs.galleryList.innerHTML = '';
  refs.loaderEl.style.display = "block"; // Відображення loader

  try {
    const data = await getSearchPhotoAPI(userSubmit);
    appState.lastSearchData = userSubmit;

    if (!data.hits.length) {
      iziToast.show({
        message: "Sorry, there are no images matching your search query. Please try again!",
        backgroundColor: 'red',
        position: 'topRight'
      });
    } else {
      photoTemplate(data);
      if (data.hits.length >= 40) {
        refs.buttonLoad.style.display = "block";
      }
    }
  } catch (error) {
    iziToast.show({
      message: "An error occurred while fetching images. Please try again later.",
      backgroundColor: 'red',
      position: 'topRight'
    });
  } finally {
    refs.loaderEl.style.display = "none"; // Приховання loader
  }

  e.target.reset(); // Очищення форми
});

// Обробник події для кнопки "Load More"
refs.buttonLoad.addEventListener('click', async (e) => {
  if (!appState.lastSearchData) {
    return;
  }
  const currentPage = Math.ceil(refs.galleryList.children.length / 40) + 1; // Заміна магічного числа
  refs.loaderMore.style.display = "block";

  try {
    const data = await getSearchPhotoAPI(appState.lastSearchData, currentPage);
    photoTemplate(data);
    if (data.hits.length >= 40) { // Заміна магічного числа
      const cardHeight = refs.galleryList.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    refs.buttonLoad.style.display = "none";
    // Показ повідомлення про досягнення кінця результатів
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      backgroundColor: 'blue',
      position: 'topRight'
    });
  } finally {
    refs.loaderMore.style.display = "none";
  }
});
