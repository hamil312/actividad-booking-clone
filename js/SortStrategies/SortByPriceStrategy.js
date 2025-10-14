export default class SortByPriceStrategy { //Estrategia para organizar por precio (de menor a mayor)
  sort(hotels) {
    return [...hotels].sort((a, b) => a.price - b.price); //Crea una copia del array de hoteles y lo ordena por precio usando la función sort
  }
}