// Importar las variables de configuración desde el archivo "./config"
import { API_URL, API_KEY } from "./config";
import { renderPagination, pageSize } from "./renderPagination";
import { renderEvents } from "./renderEvents";
import Notiflix from 'notiflix';

export async function fetchEvents(pageNumber, options) {
    const queryParams = new URLSearchParams({
        apikey: API_KEY,
        countryCode: options.countryCode ?? 'US',
        keyword: options.keyword ?? '',
        includeImages: 'yes',
        size: pageSize,
        page: pageNumber,
    });

    try {
        const response = await fetch(`https://${API_URL}?${queryParams}`);
        const data = await response.json();
        const totalElements = data.page.totalElements;

        if (totalElements === 0) {
            Notiflix.Notify.failure(`No se encontron enventos para esta búsqueda`);
        } else {
            const events = formatEvents(data._embedded.events); // Formatear los eventos
            const totalPages = Math.ceil(data.page.totalElements / pageSize);
            let currentPage = 1;
            renderEvents(events);
            renderPagination(totalPages, currentPage);
            return { events, totalPages };
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para formatear los eventos y extraer la información necesaria
export function formatEvents(events) {
    return events.map(event => {
        const defaultImageUrl = 'https://via.placeholder.com/150'; // URL de imagen por defecto
        let imageUrl = defaultImageUrl;
        let eventInfo = ''; // Variable para almacenar la información del evento
console.log(event)
        if (event.images && event.images.length > 0) {
            for (let image of event.images) {
                if (image.url) {
                    imageUrl = image.url;
                    break; // Escapar del bucle una vez que se encuentre una URL de imagen válida
                }
            }
        }

        // let eventInfo;
      if (event.info) {
            eventInfo = event.info;
        }
        let eventsUrl;
      if (event.url) {

            eventsUrl = event.url;
        }
        let localPlaces;
      if (event._embedded.venues[0].markets) {
            localPlaces = event._embedded.venues[0].markets[0].name;
        }
        let pricesStandars;
        let pricesVIPS;
      if (event.priceRanges) {

            pricesStandars =
                event.priceRanges[0].min + ' ' + event.priceRanges[0].currency;
            pricesVIPS =
                event.priceRanges[0].max + ' ' + event.priceRanges[0].currency;
        }
        let locationlat;
        let locationLong;
      if (event._embedded.venues[0].location) {
            locationlat = event._embedded.venues[0].location.latitude;

            locationLong = event._embedded.venues[0].location.longitude;
        }

        return {
            name: event.name,
            date: event.dates.start.localDate,
            dateTimes: event.dates.start.localTime + ' ' + event.dates.timezone,
            place: event._embedded.venues[0].name,
            image: imageUrl,
            info: eventInfo,
            localPlace: localPlaces,
            latitude: locationlat,
            longitude: locationLong,
            pricesStandar: pricesStandars,
            pricesVIP: pricesVIPS,
            buyTickets: eventsUrl,
        };
    });
}

