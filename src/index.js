import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GetPixabayApi } from './fetchAPI';

Notify.init({
    position:'center-top',
    timeout: 2000,
    cssAnimationStyle: 'from-top',
    showOnlyTheLastOne: true,
})

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.search-form');

formRef.addEventListener('submit', onFormSubmit);
const getPixabayApi = new GetPixabayApi();


function makeGalleryMarkup(searchedImages) {
  return searchedImages
  .map(
    ({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    vievs,
    comments,
    downloads,
}) => `<div class="photo-card">
<a href="${largeImageURL}">
<img src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes: ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views: ${vievs}</b>
  </p>
  <p class="info-item">
    <b>Comments: ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads: ${downloads}</b>
  </p>
</div>
</a>
</div>`
)
.join('');
}

function renderGallery(searchedImages) {
 galleryRef.insertAdjacentHTML('beforeend', makeGalleryMarkup());
}

async function onFormSubmit(event) {
   await event.preventDefault();
   const {hits} =  getPixabayApi.fetchImg();
    renderGallery(hits);


}