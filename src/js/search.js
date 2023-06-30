import { API_URL, API_KEY } from './config';
import { formatEvents } from '..';
import { renderEvents } from './renderEvents';
import { renderPagination, pageSize } from './renderPagination';
import Notiflix from 'notiflix';

export async function fetchEventsName(searhInput, searchPais, pageNumber) {
    const queryParams = new URLSearchParams({
        keyword: searhInput,
        apikey: API_KEY,
        locale: searchPais,
        includeImages: 'yes',
        size: pageSize,
        page: pageNumber,
    });
    try {
        const response = await fetch(`https://${API_URL}?${queryParams}`);
        const data = await response.json();
        // console.log(data);
        
        const totalElements = data.page.totalElements;

        if (totalElements === 0) {
            Notiflix.Notify.failure(`No se encontron enventos para esta búsqueda`);
        }else{
            const events = formatEvents(data._embedded.events); // Formatear los eventos
            const totalPages = Math.ceil(data.page.totalElements / pageSize);
            let currentPage = 1;
            renderEvents(events); 
            renderPagination(totalPages, currentPage);  
        }
        // console.log(totalElements);
        // console.log(totalPages);
        // console.log(events);
         
    } catch (error) {
        console.log(error);
    }
}