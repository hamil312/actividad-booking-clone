import BaseHotelAPI from "./BaseHotelAPI.js";

export default class ExpediaAPI extends BaseHotelAPI {
  constructor() {
    const data = [
      {
        id: "E001",
        name: "Hotel de los Andes",
        price: 110,
        rating: 4.7,
        reviews: 410,
        entranceDate: "2025-10-25",
        exitDate: "2025-10-30",
        guests: 2,
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
        entranceDate: "2025-11-10",
        exitDate: "2025-11-12",
        guests: 1,
        provider: "Expedia",
        city: "Medellín",
        wifi: "no",
        pool: "no"
      }
    ];

    super("ExpediaAPI", data);
  }
}