//renderEvents.js -- Obtener referencia a la galería y al modal
const gallery = document.querySelector('.gallery');
const modalBox = document.querySelector('.gallery__modal__box');

// Función para abrir el modal al hacer clic en una tarjeta
function openModalOnCardClick(card) {
  const modal = document.querySelector('[data-modal]');
  modal.classList.toggle('is-hidden');

  // Obtener la información de la tarjeta seleccionada
  const imageSrc = card.querySelector('.gallery__image').src;
  const titleText = card.querySelector('.gallery__title').textContent;
  const dateText = card.querySelector('.gallery__date').textContent;
  const placeText = card.querySelector('.gallery__place').textContent;
  const timeText = card.querySelector('.gallery__time').textContent;
  const localText = card.querySelector('.gallery__local').textContent;
  const standarText = card.querySelector('.gallery__price').textContent;
  const vipText = card.querySelector('.gallery__vip').textContent;
  const buyText = card.querySelector('.gallery__buy').textContent;
  const infoText = card.querySelector('.gallery__info').textContent; // Nueva línea: Obtener el texto del campo info

  // Limpiar el contenido actual del modal
  modalBox.innerHTML = '';

  // Crear elementos HTML para mostrar la información en el modal
  // const cardModal = document.createElement('div');
  // cardModal.classList.add('gallery__modal__card');

  const dataModal = document.createElement('div');
  dataModal.classList.add('gallery__modal__data');

  const dataModalInfo = document.createElement('div');
  dataModalInfo.classList.add('gallery__modal__data__info');

  const dataModalBuy = document.createElement('div');
  dataModalBuy.classList.add('gallery__modal__data__buy');

  const dataModalBuyPrice = document.createElement('div');
  dataModalBuyPrice.classList.add('gallery__modal__data__buy-Price');

  const dataModalBuyPriceStandar = document.createElement('div');
  dataModalBuyPriceStandar.classList.add(
    'gallery__modal__data__buy-Price_standar'
  );

  const dataModalBuyPriceVip = document.createElement('div');
  dataModalBuyPriceVip.classList.add('gallery__modal__data__buy-Price_vip');

  const dataModalSmall = document.createElement('div');
  dataModalSmall.classList.add('gallery__modal__small');

  const modalImageSmall = document.createElement('img');
  modalImageSmall.classList.add('gallery__modal__image-small');
  modalImageSmall.src = imageSrc;

  const modalImage = document.createElement('img');
  modalImage.classList.add('gallery__modal__image');
  modalImage.src = imageSrc;
  modalImage.width = 0;
  modalImage.height = 0;

  const modalWhoTitle = document.createElement('h2');
  modalWhoTitle.classList.add('gallery__modal__title');
  modalWhoTitle.textContent = 'WHO';

  const modalTitleWho = document.createElement('h2');
  modalTitleWho.classList.add('gallery__modal__date');
  modalTitleWho.textContent = titleText;

  const modalTitle = document.createElement('button');
  modalTitle.classList.add('gallery__modal__more');
  modalTitle.textContent = 'MORE FROM THIS AUTHOR';

  const searchQuery = titleText;

  modalTitle.addEventListener('click', function () {
    const searchText = encodeURIComponent(searchQuery);
    const googleSearchUrl = `https://www.google.com/search?q=${searchText}`;

    window.open(googleSearchUrl, '_blank');
  });

  const modalDateTitle = document.createElement('h2');
  modalDateTitle.classList.add('gallery__modal__title');
  modalDateTitle.textContent = 'WHEN';

  const modalDate = document.createElement('p');
  modalDate.classList.add('gallery__modal__date');
  modalDate.textContent = dateText;

  const modalTime = document.createElement('p');
  modalTime.classList.add('gallery__modal__time');
  modalTime.textContent = timeText;

  const modalPlaceTitle = document.createElement('h2');
  modalPlaceTitle.classList.add('gallery__modal__title');
  modalPlaceTitle.textContent = 'WHERE';

  const latitude = card.querySelector('.gallery__lat').textContent;
  const longitude = card.querySelector('.gallery__long').textContent;

  const modalPlace = document.createElement('p');
  modalPlace.classList.add('gallery__modal__place');
  modalPlace.classList.add('modalPlace');
  modalPlace.textContent = placeText;

  // Agrega las coordenadas al enlace de Google Maps
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  // Abre Google Maps al hacer clic en el párrafo
  modalPlace.addEventListener('click', () => {
    window.open(googleMapsLink, '_blank');
  });

  const modalLocal = document.createElement('p');
  modalLocal.classList.add('gallery__modal__local');
  modalLocal.textContent = localText;

  const modalPriceTitle = document.createElement('h2');
  modalPriceTitle.classList.add('gallery__modal__title');
  modalPriceTitle.textContent = 'PRICE';
  const modalPrice = document.createElement('p');
  modalPrice.classList.add('gallery__modal__price');
  modalPrice.textContent = standarText;

  const modalBuy = document.createElement('button');
  modalBuy.classList.add('gallery__modal__buy');
  modalBuy.textContent = 'BUY TICKETS';
  modalBuy.onclick = function () {
    var newWindow = window.open(buyText, '_blank');
    newWindow.opener = null;
  };

  const modalVIP = document.createElement('p');
  modalVIP.classList.add('gallery__modal__vip');
  modalVIP.textContent = vipText;

  const modalBuyVIP = modalBuy.cloneNode(true);
  modalBuyVIP.onclick = function () {
    var newWindow = window.open(buyText, '_blank');
    newWindow.opener = null;
  };

  const modalInfo = document.createElement('p');
  modalInfo.classList.add('gallery__modal__info');
  modalInfo.textContent = infoText;

  // Agregar los elementos al modal
  dataModal.appendChild(modalImage);
  if (infoText !== '') {
    const modalInfoTitle = document.createElement('h2');
    modalInfoTitle.classList.add('gallery__modal__title');
    modalInfoTitle.textContent = 'Info';
    dataModalInfo.appendChild(modalInfoTitle);
  } else {
    const modalInfoTitle = document.createElement('h2');
    modalInfoTitle.classList.add('gallery__modal__title');
    modalInfoTitle.textContent = '';
    dataModalInfo.appendChild(modalInfoTitle);
  }
  // dataModalInfo.appendChild(modalInfoTitle);
  dataModalSmall.appendChild(modalImageSmall);
  dataModalInfo.appendChild(modalInfo);
  dataModalInfo.appendChild(modalDateTitle);
  dataModalInfo.appendChild(modalDate);
  dataModalInfo.appendChild(modalTime);
  dataModalInfo.appendChild(modalPlaceTitle);
  dataModalInfo.appendChild(modalLocal);
  dataModalInfo.appendChild(modalPlace);
  dataModal.appendChild(dataModalInfo);

  dataModalBuy.appendChild(modalWhoTitle);
  dataModalBuy.appendChild(modalTitleWho);
  dataModalBuy.appendChild(modalPriceTitle);
  dataModalBuyPriceStandar.appendChild(modalPrice);
  dataModalBuyPriceStandar.appendChild(modalBuy);
  dataModalBuyPriceVip.appendChild(modalVIP);
  dataModalBuyPriceVip.appendChild(modalBuyVIP);

  // modalBox.appendChild(cardModal);
  modalBox.appendChild(dataModalSmall);
  modalBox.appendChild(dataModal);
  modalBox.appendChild(dataModalBuy);
  dataModalBuy.appendChild(dataModalBuyPrice);
  dataModalBuyPrice.appendChild(dataModalBuyPriceStandar);
  dataModalBuyPrice.appendChild(dataModalBuyPriceVip);

  modalBox.appendChild(modalTitle); //busq
}

// Función para renderizar los eventos en el HTML
export function renderEvents(events) {
  // Limpiar el contenido actual de la galería
  gallery.innerHTML = '';

  // Recorrer los eventos y generar el HTML para cada uno
  events.forEach(event => {
    const cardBox = document.createElement('div');
    cardBox.classList.add('gallery__box');
    const card = document.createElement('div');
    card.classList.add('gallery__card');
    card.setAttribute('data-modal-open', ''); // Agregar atributo para abrir el modal al hacer clic

    // Agregar evento de clic a la tarjeta para abrir el modal
    card.addEventListener('click', () => openModalOnCardClick(card));

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    // image.src = event.image;
    const imageSize = 'RETINA_LANDSCAPE_16_9';
    const imageUrl = `${event.image}?size=${imageSize}`;
    image.src = imageUrl;
    image.width = 0;
    image.height = 0;

    const title = document.createElement('h2');
    title.classList.add('gallery__title');
    title.textContent = event.name;

    const date = document.createElement('p');
    date.classList.add('gallery__date');
    date.textContent = event.date;

    const place = document.createElement('p');
    place.classList.add('gallery__place');
    place.textContent = event.place;

    const time = document.createElement('p');
    time.classList.add('gallery__time');
    time.textContent = event.dateTimes;

    const placeLocal = document.createElement('p');
    placeLocal.classList.add('gallery__local');
    placeLocal.textContent = event.localPlace;

    const localLat = document.createElement('p');
    localLat.classList.add('gallery__lat');
    localLat.textContent = event.latitude;

    const localLong = document.createElement('p');
    localLong.classList.add('gallery__long');
    localLong.textContent = event.longitude;

    const prices = document.createElement('p');
    prices.classList.add('gallery__price');
    prices.textContent = event.pricesStandar;

    const pricesVIPS = document.createElement('p');
    pricesVIPS.classList.add('gallery__vip');
    pricesVIPS.textContent = event.pricesVIP;

    const buyTicket = document.createElement('p');
    buyTicket.classList.add('gallery__buy');
    buyTicket.textContent = event.buyTickets;

    const info = document.createElement('p');
    info.classList.add('gallery__info');
    info.textContent = event.info;

    const border = document.createElement('div');
    border.classList.add('gallery__border');

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(place);
    card.appendChild(time);
    card.appendChild(placeLocal);
    card.appendChild(localLat);
    card.appendChild(localLong);
    card.appendChild(prices);
    card.appendChild(pricesVIPS);
    card.appendChild(buyTicket);
    card.appendChild(info);
    cardBox.appendChild(card);
    gallery.appendChild(cardBox);
    cardBox.appendChild(border);
  });
}
