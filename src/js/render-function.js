import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  formEL: document.querySelector('.js-search-form'),
  listEL: document.querySelector('.gallery'),
}

export function photoTemplate(data) {
  const options = {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    animation: 250,
    widthRatio: 0.9,
    scaleImageToRatio: true,
  }
  const markup = data.hits
    .map(data => {
      return `<li class="gallery-item"><a href="${data.webformatURL}">
          <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
          <div class="bloc-content">
          <p><b>Likes: </b>${data.likes}</p>
          <p><b>Views: </b>${data.views}</p>
          <p><b>Comments: </b>${data.comments}</p>
          <p><b>Downloads: </b>${data.downloads}</p>
          </div>
          </li>`;
    })
  .join("")
  refs.listEL.insertAdjacentHTML('afterbegin', markup);
  const lightbox = new SimpleLightbox('.gallery a' , options);
  lightbox.refresh();
  refs.formEL.reset();
}