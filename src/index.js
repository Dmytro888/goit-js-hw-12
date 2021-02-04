import debounce from 'lodash.debounce';
import countryListTemp from './templates/country_list.hbs';
import countryInfoTemp from './templates/country_info.hbs';
import './css/styles.css';
const refInput = document.querySelector('input');

refInput.addEventListener(
  'input',
  debounce(event => {
    fetchCountryData(event);
  }, 500),
);

function fetchCountryData (event) {
  fetch(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
    .then(result => result.json())
    .then(data => {
      removeList();
      addList(data);
      inputOutOfLimit(data);
      countryInfo(data);
    });
}
function countryInfo (data) {
  if (data.length === 1) {
    const markup = countryInfoTemp(data);
    document.body.insertAdjacentHTML('beforeend', markup);
  }
}

function inputOutOfLimit (data) {
  if (data.length > 10) alert('Дохуя');
}

function removeList () {
  if (document.querySelector('.country-list')) {
    document.querySelector('.country-list').remove();
  }
}

function addList (data) {
  if (data.length > 1 && data.length <= 10) {
    const markup = countryListTemp(data);
    document.body.insertAdjacentHTML('beforeend', markup);
  }
}
