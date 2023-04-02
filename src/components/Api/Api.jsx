const BASE__URL = 'https://api.themoviedb.org/3/';
const API__KEY = '0fa5981d55037b4698e315d74908e1b9';

export async function fetchHome() {
  return fetch(`${BASE__URL}trending/all/day?api_key=${API__KEY}`).then(
    response => response.json()
  );
}

export async function fetchById(id) {
  return fetch(`${BASE__URL}movie/${id}?api_key=${API__KEY}`).then(response =>
    response.json()
  );
}

export async function fetchByName(filmName) {
  return fetch(
    `${BASE__URL}search/movie?api_key=${API__KEY}&query=${filmName}`
  ).then(response => response.json());
}

export async function fetchCast(id) {
  return fetch(
    `${BASE__URL}movie/${id}/credits?api_key=${API__KEY}&language=en-US`
  ).then(response => response.json());
}

export async function fetchReviews(id) {
  return fetch(
    `${BASE__URL}movie/${id}/reviews?api_key=${API__KEY}&language=en-US`
  ).then(response => response.json());
}
