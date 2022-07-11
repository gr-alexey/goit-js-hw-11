import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GetPixabayApi } from './fetchAPI';
import { clearGallery } from './clearGallery';

Notify.init({
    position:'from-right',
    timeout: 2000,
    cssAnimationStyle: 'from-right',
    showOnlyTheLastOne: true,
})

const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData:'alt',
    captionDelay: 300,  
      });
const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  button: document.querySelector('.load-more'),
  card: document.querySelector('.photo-card'),
};

refs.button.style.display = 'none';

refs.form.addEventListener('submit', onFormSubmit);
refs.button.addEventListener('click', onLoadMore);

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
<a class='gallery__link' href="${largeImageURL}">
<img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" />
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
};

function renderGallery(searchedImages) {
 refs.gallery.insertAdjacentHTML('beforeend', makeGalleryMarkup(searchedImages));
};

async function onFormSubmit(event) {
    event.preventDefault();
    clearGallery();
    getPixabayApi.resetPage();
    const request = event.target.elements.searchQuery.value.trim();
    if(!request) {return Notify.info("Input some to search")
}
    
   getPixabayApi.searchQueryRequest = request;
   try {
    const {hits,totalHits} = await getPixabayApi.fetchImg();
    if(!totalHits) {
        return Notify.warning("Sorry, there are no images matching your search query. Please try again.")}
    Notify.success(`Hooray! We found ${totalHits} images.`);
    renderGallery(hits);
    lightbox.refresh();
   } catch(error) {console.log(error.message)}
   refs.button.style.display = 'block';
    
    event.target.reset();


};

async function onLoadMore() {

 try{ 
const {hits,totalHits} = await getPixabayApi.fetchImg();
renderGallery(hits);

const total = document.querySelectorAll('.photo-card').length;
    console.log(total);
    if (total >= totalHits) {
        refs.button.classList.add('visually-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

lightbox.refresh();

    } catch(error) {console.log(error.message)} 
};




