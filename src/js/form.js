import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchAPI } from './fetchApi';
import { renderMarkUp } from './markup';

const formEl = document.querySelector('.search-form');
const listEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const newFetchApi = new fetchAPI(); //----екземпляр

const handleSerchPictures = async event => {
  event.preventDefault();

  const searchValue = event.currentTarget.elements['searchQuery'].value.trim();
  newFetchApi.text = searchValue;
  newFetchApi.page = 1;

  try {
    const { data } = await newFetchApi.fetchPictures(searchValue);

    if (!data.hits.length) {
      throw new Error(
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      );
    }

    listEl.innerHTML = renderMarkUp(data.hits);
    btnLoadMore.classList.remove('is-hidden');
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    btnLoadMore.classList.add('is-hidden');
    listEl.innerHTML = '';
  }
};

const handleSerchMoreP = async () => {
  newFetchApi.page += 1;

  try {
    const { data } = await newFetchApi.fetchPictures();

    listEl.insertAdjacentHTML('beforeend', renderMarkUp(data.hits));
    lightbox.refresh();

    const howMachpages = data.totalHits / 40;
    if (howMachpages <= newFetchApi.page) {
      btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

formEl.addEventListener('submit', handleSerchPictures);
btnLoadMore.addEventListener('click', handleSerchMoreP);
