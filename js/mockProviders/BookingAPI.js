export default class BookingAPI {
  async fetch(filters) { //Función asíncrona que simula una llamada a una API externa
    console.log("Consultando BookingAPI con:", filters); //Mensaje de llamada a la API
    await new Promise(r => setTimeout(r, 500)); //Simula un retardo de 500ms

    const data = [ //Datos simulados
      {
        id: "B001",
        name: "Hotel Central Bogotá",
        price: 120,
        rating: 4.5,
        reviews: 320,
        provider: "Booking",
        city: "Bogotá",
        wifi: "yes",
        pool: "yes"
      },
      {
        id: "B002",
        name: "EcoHotel Chapinero",
        price: 90,
        rating: 4.2,
        reviews: 180,
        provider: "Booking",
        city: "Bogotá",
        wifi: "yes",
        pool: "no"
      }
    ];

    let filtered = data;

    if (filters.city) {
      filtered = filtered.filter(h => 
        h.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.name) {
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.price && filters.price > 0) {
      filtered = filtered.filter(h => h.price <= filters.price);
    }

    if (filters.wifi && filters.wifi !== "any") {
      filtered = filtered.filter(h => h.wifi === filters.wifi);
    }

    if (filters.wifi == "any") {
      filtered = filtered.filter(h => h.wifi === "yes" || h.wifi === "no");
    }

    if (filters.pool && filters.pool !== "any") {
      filtered = filtered.filter(h => h.pool === filters.pool);
    }

    if (filters.pool == "any") {
      filtered = filtered.filter(h => h.pool === "yes" || h.pool === "no");
    }

    return filtered;
  }
}