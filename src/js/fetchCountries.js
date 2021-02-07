import countryListTemp from '../templates/country_list.hbs';
import countryInfoTemp from '../templates/country_info.hbs';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

export default function fetchCountryData (event) {
  const input = event.target.value;

  fetchCountries(input)
    .then(response => {
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
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
      messageWarn(event);
    });
}

function messageWarn (event) {
  if (event.target.value.length > 1) {
    PNotify.error({
      text: 'NO MATCHES!!!TRY TO TYPE ANOTHER VALUE!!!',

      delay: 1500,
      closerHover: true,
    });
  }
}

function fetchCountries (searchQuery) {
  const url = 'https://restcountries.eu/rest/v2/name';
  return fetch(`${url}/${searchQuery}`);
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
      delay: 1500,
      closerHover: true,
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
