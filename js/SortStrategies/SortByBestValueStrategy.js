export default class SortByBestValueStrategy { //Estrategia para organizar por mejor valor (calificación/precio)
  sort(hotels) {
    return [...hotels].sort((a, b) => { //Crea una copia del array de hoteles y lo ordena por mejor valor usando la función sort
      const valueA = (a.rating * 5) / a.price; //Calcula el valor para el hotel A (calificación * 5 / precio)
      const valueB = (b.rating * 5) / b.price; //Calcula el valor para el hotel B (calificación * 5 / precio)
      return valueB - valueA; //Ordena por mejor valor (de mayor a menor)
    });
  }
}