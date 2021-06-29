export default function getFetch(url, query, key, perPage) {
  return fetch(
    `${url}?image_type=photo&orientation=horizontal&q=${query}&page=1&per_page=${perPage}&key=${key}`,
  ).then(r => r.json());
}
