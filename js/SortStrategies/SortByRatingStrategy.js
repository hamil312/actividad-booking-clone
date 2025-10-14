export default class SortByRatingStrategy { //Estrategia para organizar por calificación (de mayor a menor)
  sort(hotels) { //Ordenar los hoteles
    return [...hotels].sort((a, b) => {//Crea una copia del array de hoteles y lo ordena por calificación usando la función sort
      if (b.rating === a.rating) { //Si las calificaciones son iguales, ordenar por número de reseñas
        return b.reviews - a.reviews; //Ordena por número de reseñas (de mayor a menor)
      }
      return b.rating - a.rating; //Ordena por calificación (de mayor a menor)
    });
  }
}