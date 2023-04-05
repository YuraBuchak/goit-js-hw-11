import Notiflix from 'notiflix';
import Axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchAPI } from './fetchApi';
import { renderMarkUp } from './markup';

const formEl = document.querySelector('.search-form');
const listEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.5,
});

const newFetchApi = new fetchAPI(); //----екземпляр

const handleSerchPictures = event => {
  event.preventDefault();

  const searchValue = event.currentTarget.elements['searchQuery'].value.trim();
  newFetchApi.text = searchValue;

  newFetchApi
    .fetchPictures(searchValue)
    .then(dataArrays => {
      if (!dataArrays.hits.length) {
        throw new Error(
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        );
      }

      listEl.innerHTML = renderMarkUp(dataArrays.hits);

      if (dataArrays.total_pages === newFetchApi.page) {
        return;
      }

      btnLoadMore.classList.remove('is-hidden');
      Notiflix.Notify.info(`Hooray! We found ${dataArrays.totalHits} images.`);
      lightbox.refresh();
    })
    .catch(() => {
      btnLoadMore.classList.add('is-hidden');
      listEl.innerHTML = '';
    });
};

const handleSerchMoreP = () => {
  newFetchApi.page += 1;

  newFetchApi.fetchPictures().then(dataArrays => {
    if (dataArrays.total_pages === newFetchApi.page) {
      btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    listEl.insertAdjacentHTML('beforeend', renderMarkUp(dataArrays.hits));
    lightbox.refresh();
  });
};

formEl.addEventListener('submit', handleSerchPictures);
btnLoadMore.addEventListener('click', handleSerchMoreP);
