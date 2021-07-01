import './sass/main.scss';
import ApiService from './apiService.js';
import imagesTpl from './templates/templateForImages.hbs';
import * as basicLightbox from 'basiclightbox';

const searchForm = document.getElementById('search-form');
const containerOfItems = document.querySelector('.gallery');

const marker = document.querySelector('.marker');
const debounce = require('lodash.debounce');
const imagesApiService = new ApiService();

searchForm.addEventListener(
  'input',
  debounce(e => {
    e.preventDefault();
    imagesApiService.searchQuery = e.target.value.toLowerCase().trim();
    if (imagesApiService.searchQuery !== '') {
      imagesApiService.resetPage();
      imagesApiService.fetchImages().then(data => {
        clearContainerOfImages();
        createGalleryCards(data);
        createBigImage(data.hits);
      });
    }
  }, 500),
);

function createGalleryCards(arrayOfImages) {
  return containerOfItems.insertAdjacentHTML('beforeend', imagesTpl(arrayOfImages));
}

function clearContainerOfImages() {
  containerOfItems.innerHTML = '';
}

const addGroupImages = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApiService.searchQuery !== '') {
      imagesApiService.fetchImages().then(data => {
        createGalleryCards(data);
        createBigImage(data.hits);
      });
    }
  });
};

const options = {
  rootMargin: '100px',
};

const observer = new IntersectionObserver(addGroupImages, options);

observer.observe(marker);

function createBigImage(array) {
  const photoCards = document.querySelector('.gallery');
  photoCards.addEventListener('click', e => {
    console.log(e.target);
    if (e.target.getAttribute('class') === 'picture') {
      array.map(elem => {
        if (e.target.getAttribute('src') === elem.webformatURL) {
          return basicLightbox.create(`<img src="${elem.largeImageURL}" width="800">`).show();
        }
      });
    }
  });
}
