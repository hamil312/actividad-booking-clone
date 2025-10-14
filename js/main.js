import filtersManager from "./SearchFiltersManager.js";
import HotelProviderFacade from "./HotelProviderFacade.js";
import BookingAPI from "./mockProviders/BookingAPI.js";
import ExpediaAPI from "./mockProviders/ExpediaAPI.js";
import ResultsList from "./ResultsList.js";
import SortByPriceStrategy from "./SortStrategies/SortByPriceStrategy.js";
import SortByRatingStrategy from "./SortStrategies/SortByRatingStrategy.js";
import SortByBestValueStrategy from "./SortStrategies/SortByBestValueStrategy.js"; //Importamos los módulos necesarios

const searchBtn = document.getElementById("searchBtn"); //Referenciamos el botón de busqueda a través de GetElementById
const nameInput = document.getElementById("name"); //Referenciamos el input de nombre a través de GetElementById
const checkInInput = document.getElementById("checkIn"); //Referenciamos el input de fecha de entrada a través de GetElementById
const checkOutInput = document.getElementById("checkOut"); //Referenciamos el input de fecha de salida a través de GetElementById
const priceInput = document.getElementById("price"); //Referenciamos el input de precio a través de GetElementById
const cityInput = document.getElementById("city"); //Referenciamos el input de ciudad a través de GetElementById
const wifiInput = document.getElementById("wifi"); //Referenciamos el input de wifi a través de GetElementById
const poolInput = document.getElementById("pool"); //Referenciamos el input de piscina a través de GetElementById

const resultsList = new ResultsList("#results"); //Creamos una instancia de ResultsList para manejar la visualización de resultados pasandole el selector de CSS
const facade = new HotelProviderFacade(); //Creamos una instancia del Facade para manejar las APIs de proveedores de hoteles
facade.addProvider(new BookingAPI()); //Agregamos la API de Booking al Facade
facade.addProvider(new ExpediaAPI()); //Agregamos la API de Expedia al Facade

function getStrategyByValue(value) { //Función para obtener la estrategia de ordenamiento según el valor seleccionado
  switch (value) {
    case "rating": //Si el valor es "rating"
      return new SortByRatingStrategy(); //Retornamos una instancia de SortByRatingStrategy
    case "bestvalue":
      return new SortByBestValueStrategy(); //Retornamos una instancia de SortByBestValueStrategy
    default:
      return new SortByPriceStrategy(); //Retornamos una instancia de SortByPriceStrategy
  }
}

searchBtn.addEventListener("click", async () => { //Agregamos un event listener al botón de búsqueda para el evento "click"
  filtersManager.setFilter("name", nameInput.value); //Actualizamos el filtro de destino en el gestor de filtros
  filtersManager.setFilter("dates", { //Actualizamos el filtro de fechas en el gestor de filtros, pasando la clave de fecha y asignandole un objeto con las fechas de entrada y salida
    checkIn: checkInInput.value, //Asignamos el input de fecha de entrada
    checkOut: checkOutInput.value //Asignamos el input de fecha de salida
  });
  filtersManager.setFilter("price", Number(priceInput.value)); //Actualizamos el filtro de precio en el gestor de filtros, convirtiendo el valor del input a número
  filtersManager.setFilter("city", cityInput.value); //Actualizamos el filtro de ciudad en el gestor de filtros
  filtersManager.setFilter("wifi", wifiInput.value); //Actualizamos el filtro de wifi en el gestor de filtros
  filtersManager.setFilter("pool", poolInput.value); //Actualizamos el filtro de piscina en el gestor de filtros
  const selectedSort = sortSelect.value; //Creamos una variable para almacenar el valor seleccionado en el dropdown de ordenamiento
  const strategy = getStrategyByValue(selectedSort); //Obtenemos la estrategia de ordenamiento correspondiente al valor seleccionado
  resultsList.setSortStrategy(strategy); //Establecemos la estrategia de ordenamiento en la instancia de ResultsList
  filtersManager.setFilter("currentSort", selectedSort); //Actualizamos el filtro de orden actual en el gestor de filtros

  resultsList.render([]); //Limpiamos los resultados anteriores antes de realizar una nueva búsqueda
  const { results: hotels, errors } = await facade.search(filtersManager.getState()); //Realizamos la búsqueda a través del Facade, pasando el estado actual de los filtros y esperando la respuesta

  if (errors.length > 0) {
    alert("Algunos proveedores no respondieron correctamente:\n" + errors.join("\n")); //Mostramos una alerta si hubo errores en la búsqueda
  }
  resultsList.render(hotels); //Renderizamos los resultados obtenidos en la lista de resultados
});
