export default class BaseHotelAPI {
  constructor(providerName, data) {
    this.providerName = providerName;
    this.data = data;
  }

  async fetch(filters) {
    console.log(`Consultando ${this.providerName} con:`, filters);
    await new Promise(r => setTimeout(r, 500));

    let filtered = this.data; //Inicialmente, todos los datos están en el array filtrado

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

    if (filters.guests && filters.guests > 0) {
      filtered = filtered.filter(h => h.guests === filters.guests);
    }else {
      filtered = filtered.filter(h => h.guests >= 1);
    }


    if (filters.entranceDate && filters.entranceDate !== "") {
      filtered = filtered.filter(h => h.entranceDate === filters.entranceDate);
    }

    if (filters.exitDate && filters.exitDate !== "") {
      filtered = filtered.filter(h => h.exitDate === filters.exitDate);
    }

    return filtered;
  }
}