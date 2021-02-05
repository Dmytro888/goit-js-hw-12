import debounce from 'lodash.debounce';
import countryListTemp from './templates/country_list.hbs';
import countryInfoTemp from './templates/country_info.hbs';
import './css/styles.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import fetchResult from './js/fetchCountries.js';

const refInput = document.querySelector('input');

refInput.addEventListener(
  'input',
  debounce(event => {
    fetchCountryData(event);
  }, 500),
);

function fetchCountryData (event) {
  const input = event.target.value;

  fetchResult(input)
    .then(response => {
      if (response.status < 400) {
        return response.json();
      }
    })
    .then(data => {
      removeList();
      addList(data);
      inputOutOfLimit(data);
      countryInfo(data);
    })
    .catch(error => {
      PNotify.error({
        text: 'NO MATCHES!!!',
      });
    });
}
function countryInfo (data) {
  if (data.length === 1) {
    const markup = countryInfoTemp(data);
    document.body.insertAdjacentHTML('beforeend', markup);
  }
}

function inputOutOfLimit (data) {
  if (data.length > 10) {
    PNotify.error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}

function removeList () {
  if (document.querySelector('.country-list')) {
    document.querySelector('.country-list').remove();
  }
  if (document.querySelector('.info')) {
    document.querySelector('.info').remove();
  }
}

function addList (data) {
  if (data.length > 1 && data.length <= 10) {
    const markup = countryListTemp(data);
    document.body.insertAdjacentHTML('beforeend', markup);
  }
}
