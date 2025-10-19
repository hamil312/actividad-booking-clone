export default class ResultsList {
  constructor(containerSelector) { //El constructor recibe un selector CSS para el contenedor donde se mostrarán los resultados
    this.container = document.querySelector(containerSelector); //Selecciona el contenedor en el DOM usando el selector proporcionado
    this.sortStrategy = null; //Inicializa la estrategia de ordenamiento como nula
  }

  setSortStrategy(strategy) {
    this.sortStrategy = strategy; //Establece la estrategia de ordenamiento
  }

  render(hotels) { //Función que renderiza la lista de hoteles
    let sortedHotels = hotels; //Inicializa una variable para los hoteles ordenados
    if (this.sortStrategy) {
      sortedHotels = this.sortStrategy.sort(hotels); //Si hay una estrategia de ordenamiento, ordena los hoteles usando esa estrategia
    }

    if (!sortedHotels || sortedHotels.length === 0) { //Verifica si existen hoteles para mostrar
      this.container.innerHTML = `<p>No se encontraron hoteles</p>`; //En caso de que no, se muestra un mensaje
      return;
    }

    this.container.innerHTML = sortedHotels //Modifica el contenido HTML del contenedor
      .map( //Por cada hotel en el array de hoteles
        hotel => `
        <div class="hotel-card">
            <h3>${hotel.name}</h3>
            <p class="price">$${hotel.price} USD / noche</p>
            <p>⭐ ${hotel.rating} (${hotel.reviews} reseñas)</p>
            <p class="provider">Proveedor: ${hotel.provider}</p>
            <p class="city">Ciudad: ${hotel.city}</p>
            <p class="dates">Fechas: ${hotel.entranceDate} - ${hotel.exitDate}</p>
            <p class="guests">Huéspedes: ${hotel.guests}</p>
            <p class="amenities">WiFi: ${hotel.wifi}, Piscina: ${hotel.pool}</p>
        </div>
      ` //Por cada elemento, crea una tarjeta con la información del hotel (nombre, precio, calificación, número de reseñas y proveedor
      )
      .join(""); //Une todas las tarjetas en una sola cadena de texto y la asigna al innerHTML del contenedor
  }
}