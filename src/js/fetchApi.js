'use strict';

import axios from 'axios';

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

  async fetchPictures() {
    const searchParams = new URLSearchParams({
      ...this.SERCH_PARAMS,
    });

    return await axios.get(
      `${this.BASE_URL}?key=${this.API_KEY}&q=${this.text}&page=${this.page}&${searchParams}`
    );
  }
}
