'use strict';

export class fetchAPI {
  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '35063587-fa9231e1cb527798f33412cb6';
  SERCH_PARAMS = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40',
  };
  page = 1;
  text = null;
  fetchPictures() {
    const searchParams = new URLSearchParams({
      ...this.SERCH_PARAMS,
    });

    return fetch(
      `${this.BASE_URL}?key=${this.API_KEY}&q=${this.text}&page=${this.page}&${searchParams}`
    ).then(data => {
      if (!data.ok) {
        throw new Error(Notiflix.Notify.failure('Запит не відбувся'));
      }

      return data.json();
    });
  }
}
