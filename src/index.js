import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';

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
const buttonRef = document.querySelector('.load-more');

formRef.addEventListener('submit', onFormSubmit);
buttonRef.addEventListener('click', onLoadMore);

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
 galleryRef.insertAdjacentHTML('beforeend', makeGalleryMarkup(searchedImages));
}

async function onFormSubmit(event) {
    event.preventDefault();
    clearGallery();
    getPixabayApi.resetPage();
    const request = event.target.elements.searchQuery.value.trim();
    if(!request) {return Notify.info("Input some to search")}
   
    
   getPixabayApi.searchQueryRequest = request;
   try {
    const {hits,totalHits} = await getPixabayApi.fetchImg();
    if(!totalHits) {
        return Notify.warning("Sorry, there are no images matching your search query. Please try again.")}
    Notify.success(`Hooray! We found ${totalHits} images.`);
    renderGallery(hits);
    lightbox.refresh();
   } catch(error) {console.log(error.message)}
    
    
    event.target.reset();


}

async function onLoadMore() {

 try{ 
const {hits,totalHits} = await getPixabayApi.fetchImg();
renderGallery(hits);
lightbox.refresh();
} catch(error) {console.log(error.message)} 
}

function clearGallery() {
galleryRef.innerHTML = "";

}

const lightbox = new SimpleLightbox('.gallery a', {
   captionsData:'alt',
   captionDelay: 300,  
     });