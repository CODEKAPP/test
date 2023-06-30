import { fetchEvents, } from './js/utils';
import { selecPaises } from './js/paises';
import { animation } from './js/arrow';
import { toggleModal } from './js/modal';
const select = document.querySelector(".header__inputs-2");
const input= document.querySelector(".header__inputs-1");
let pageNumber = 1;
let searhInput = document.querySelector('.header__inputs-1').value;

const options = {
  countryCode: 'US',
  keyword: searhInput,
};
// toggleModal();
animation();
fetchEvents(pageNumber, options);

for (let i = 0; i < selecPaises.length; i++) {
  let opcion = document.createElement('option');
  opcion.value = selecPaises[i].clave;
  opcion.text = selecPaises[i].nombre;
  select.appendChild(opcion);
}

input.addEventListener('blur', () => {
  let searhInput = document.querySelector('.header__inputs-1').value;
  // searchPais = '*';
  const options = {
    countryCode: 'US',
    keyword: searhInput,
  };
  fetchEvents(pageNumber, options);
});

select.addEventListener('change', () => {
  let searhInput = document.querySelector('.header__inputs-1').value;
  let searchPais = document.querySelector('.header__inputs-2').value;
  const options = {
    countryCode: searchPais.toUpperCase(),
    keyword: searhInput,
  };
  fetchEvents(pageNumber, options);
});

