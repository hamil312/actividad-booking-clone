import BaseHotelAPI from "./BaseHotelAPI.js";

export default class BookingAPI extends BaseHotelAPI {
  constructor() {
    const data = [
      {
        id: "B001",
        name: "Hotel Central Bogotá",
        price: 120,
        rating: 4.5,
        reviews: 320,
        entranceDate: "2025-11-01",
        exitDate: "2025-11-05",
        guests: 3,
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
        entranceDate: "2025-10-22",
        exitDate: "2025-10-25",
        guests: 1,
        provider: "Booking",
        city: "Bogotá",
        wifi: "yes",
        pool: "no"
      }
    ];

    super("BookingAPI", data);
  }
}