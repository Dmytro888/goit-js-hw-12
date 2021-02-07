import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchResult from './js/fetchCountries.js';

const refInput = document.querySelector('input');

refInput.addEventListener(
  'input',
  debounce(event => {
    fetchResult(event);
  }, 500),
);
