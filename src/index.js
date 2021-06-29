import './sass/main.scss';
import getFetch from './apiService.js';
import imagesTpl from './templates/templateForImages.hbs';

const searchForm = document.getElementById('search-form');
const containerOfItems = document.querySelector('.gallery');
const debounce = require('lodash.debounce');

const KEY = '22290512-61c8db1e23d404eb0727e3aee';
const PER_PAGE = '12';
const BASE_URL = 'https://pixabay.com/api/';

searchForm.addEventListener(
  'input',
  debounce(e => {
    e.preventDefault();
    let query = e.target.value.toLowerCase().trim();
    if (query !== '') {
      getFetch(BASE_URL, query, KEY, PER_PAGE).then(createGalleryCards);
    }
    containerOfItems.innerHTML = '';
  }, 1000),
);

function createGalleryCards(arrayOfImages) {
  return (containerOfItems.innerHTML = imagesTpl(arrayOfImages));
}
