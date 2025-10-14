class SearchFiltersManager {
  constructor() { //Código que se ejecuta al instancia la clase
    if (SearchFiltersManager.instance) {//Buscamos si ya existe una instancia, pues en el patrón Singleton solo se usa una, y para este caso necesitamos una instancia global
      return SearchFiltersManager.instance; //De existir, devolvemos esa
    }

    this.state = { //Creamos un objeto que define el estado inicial de los filtros
      name: "", //El nombre empieza vacío
      city: "", //La ciudad empieza vacía
      dates: { checkIn: "", checkOut: "" }, //Las fechas de entrada y salida también vacías
      price: 0, //Precio empieza en 0
      pool: "any",
      wifi: "any",
      appliedFilters: [], //Filtros aplicados empieza vacío
      currentSort: "price_asc" //Orden actual empieza en orden ascendente por precio
    };

    SearchFiltersManager.instance = this; //Guardamos la instancia creada en una propiedad estática de la clase
  }

  getState() {
    return this.state; //Obtenemos el estado actual
  }

  setFilter(key, value) {
    this.state[key] = value; //Establecemos un filtro a través de su clave y un valor
  }

  addAppliedFilter(filter) {
    if (!this.state.appliedFilters.includes(filter)) { //Verificamos que el filtro no esté aplicado ya
      this.state.appliedFilters.push(filter); //En caso de no estarlo lo añadimos
    }
  }

  removeAppliedFilter(filter) {
    this.state.appliedFilters = this.state.appliedFilters.filter(f => f !== filter); //Filtramos a través del array para eliminar el filtro especificado
  }

  resetFilters() {
    this.state = { //Reiniciamos el estado a los valores iniciales
      name: "",
      city: "",
      dates: { checkIn: "", checkOut: "" },
      price: 0,
      appliedFilters: [],
      currentSort: "price_asc",
      wifi: "any",
      pool: "any"
    };
  }
}

const filtersManager = new SearchFiltersManager(); //Creamos una instancia de la clase
export default filtersManager; //Exportamos la instancia para que pueda ser usada en otros módulos