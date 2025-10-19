import BaseHotelAPI from "./BaseHotelAPI.js";

export default class RealHotelAPI extends BaseHotelAPI {
  constructor(providerName, apiUrl) {
    super(providerName, []); //No usa datos mock
    this.apiUrl = apiUrl;//URL del endpoint externo
  }

  async fetch(filters) {
    console.log(`🔗 Consultando API real de ${this.providerName}...`);

    try {
      //Construir los parámetros dinámicamente
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`${this.apiUrl}?${query}`); //Hacemos la petición a la API externa con los filtros como query parameters

      if (!response.ok) throw new Error(`Error al consultar ${this.providerName}`);

      const data = await response.json();

      //Adaptamos los campos que obtenemos de la API a nuestro formato interno
      const hotels = data.map(hotel => ({
        id: hotel.id || crypto.randomUUID(),
        name: hotel.name || hotel.hotelName,
        city: hotel.city || hotel.location?.city || "Desconocido",
        price: hotel.price || hotel.rate || 0,
        rating: hotel.rating || hotel.stars || 0,
        reviews: hotel.reviews || 0,
        wifi: hotel.wifi ? "yes" : "no",
        pool: hotel.pool ? "yes" : "no",
        guests: hotel.guests || 2,
      }));

      return hotels;

    } catch (error) {
      console.error(`❌ Error al obtener datos de ${this.providerName}:`, error);
      return [];
    }
  }
}