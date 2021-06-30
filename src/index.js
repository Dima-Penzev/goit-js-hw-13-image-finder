import './sass/main.scss';
import ApiService from './apiService.js';
import imagesTpl from './templates/templateForImages.hbs';

const searchForm = document.getElementById('search-form');
const containerOfItems = document.querySelector('.gallery');
const LoadMoreBtn = document.querySelector('[data-action="load-more"]');
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
      });
    }
  }, 500),
);

LoadMoreBtn.addEventListener('click', addMoreImages);

function createGalleryCards(arrayOfImages) {
  return (containerOfItems.insertAdjacentHTML('beforeend', imagesTpl(arrayOfImages)));
}

function addMoreImages() {
  imagesApiService.fetchImages().then(createGalleryCards);
}

function clearContainerOfImages() {
  containerOfItems.innerHTML = '';
}