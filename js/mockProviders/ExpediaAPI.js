export default class ExpediaAPI {
  async fetch(filters) { //Función asíncrona que simula una llamada a una API externa
    console.log("Consultando ExpediaAPI con:", filters); //Mensaje de llamada a la API
    await new Promise(r => setTimeout(r, 500)); //Simula un retardo de 500ms

    //if (Math.random() < 0.5) { //Simula un fallo aleatorio
    //  throw new Error("Expedia no respondió (Timeout)");
    //}

    const data = [ //Retorna datos simulados
      {
        id: "E001",
        name: "Hotel de los Andes",
        price: 110,
        rating: 4.7,
        reviews: 410,
        provider: "Expedia",
        city: "Cali",
        wifi: "yes",
        pool: "yes"
      },
      {
        id: "E002",
        name: "Hostal Zona Rosa",
        price: 70,
        rating: 4.0,
        reviews: 90,
        provider: "Expedia",
        city: "Medellín",
        wifi: "no",
        pool: "no"
      }
    ];

    let filtered = data; //Inicialmente, todos los datos están en el array filtrado

    if (filters.city) { //Si se ha especificado un filtro de ciudad
      filtered = filtered.filter(h =>
        h.city.toLowerCase().includes(filters.city.toLowerCase()) //Filtramos los hoteles cuya ciudad incluya el valor del filtro, ignorando mayúsculas/minúsculas
      );
    }

    if (filters.name) { //Si se ha especificado un filtro de nombre
      filtered = filtered.filter(h =>
        h.name.toLowerCase().includes(filters.name.toLowerCase()) //Filtramos los hoteles cuyo nombre incluya el valor del filtro, ignorando mayúsculas/minúsculas
      );
    }

    if (filters.price && filters.price > 0) { //Si se ha especificado un filtro de precio mayor que 0
      filtered = filtered.filter(h => h.price <= filters.price); //Filtramos los hoteles cuyo precio sea menor o igual al valor del filtro
    }

    if (filters.wifi && filters.wifi !== "any") { //Si se ha especificado un filtro de wifi que no sea "any"
      filtered = filtered.filter(h => h.wifi === filters.wifi); //Filtramos los hoteles cuyo valor de wifi coincida con el del filtro
    }

    if (filters.wifi == "any") {
      filtered = filtered.filter(h => h.wifi === "yes" || h.wifi === "no");
    }

    if (filters.pool && filters.pool !== "any") { //Si se ha especificado un filtro de piscina que no sea "any"
      filtered = filtered.filter(h => h.pool === filters.pool); //Filtramos los hoteles cuyo valor de piscina coincida con el del filtro
    }

    if (filters.pool == "any") { 
      filtered = filtered.filter(h => h.pool === "yes" || h.pool === "no");
    }

    return filtered;
  }
}