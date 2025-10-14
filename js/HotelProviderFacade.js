export default class HotelProviderFacade {
  constructor() { //Este código se ejecuta al crear una instancia
    this.providers = []; //En este array almacenamos las APIs de proveedores de hoteles
  }

  addProvider(providerAPI) {
    this.providers.push(providerAPI); //Agregamos una nueva API al proveedor
  }

  removeProvider(providerName) {
    this.providers = this.providers.filter( //Filtramos el array para eliminar la API cuyo nombre de clase coincida con el pasado como parámetro
      p => p.constructor.name !== providerName
    );
  }

  listProviders() {
    return this.providers.map(p => p.constructor.name); //Retornamos un array con los nombres de las clases de las APIs registradas
  }

  async search(filters) {
    const allResults = []; //Aquí almacenamos todos los resultados de las APIs
    const errors = []; //Almacenamos los posibles errores

    const promises = this.providers.map(p => p.fetch(filters)); //Creamos un array de promesas llamando al método fetch de cada API

    const results = await Promise.allSettled(promises); //Esperamos a que todas las promesas se resuelvan o rechacen

    results.forEach(result => { //Por cada promesa resuelta o rechazada
      if (result.status === "fulfilled") { //Si se resolvió correctamente
        allResults.push(...result.value); //Agregamos los resultados al array principal de resultados
      } else {
        console.error(`Proveedor falló: ${result.reason?.message || result.reason}`); //De otra forma, mostramos el error en consola
        errors.push(result.reason?.message || "Error desconocido"); //Lo agregamos al array de errores
      }
    });

    if (errors.length > 0) { //Si hubo errores, los mostramos en consola
      console.warn("Algunos proveedores fallaron:", errors);
    }

    return {
      results: allResults, //Devolvemos todos los resultados
      errors //Devolvemos los errores
    }; 
  }
}