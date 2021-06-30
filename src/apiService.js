const KEY = '22290512-61c8db1e23d404eb0727e3aee';
const PER_PAGE = '12';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}&key=${KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data;
      });
  }

  resetPage() {
    this.page = 1;
  }
}
