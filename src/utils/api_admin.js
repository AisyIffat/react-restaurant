import axios from "axios";
import { API_URL } from "./constants";


export const getBookingsAdmin = async (token, status) => {
  const response = await axios.get(API_URL + "admins/" + "bookings" + (status === "all" ? "" : "?status=" + status), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};