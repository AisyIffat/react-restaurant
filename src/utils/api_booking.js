import axios from "axios";
import { API_URL } from "./constants";

export const getBookings = async (token, status) => {
  const response = await axios.get(API_URL + "bookings" + (status === "all" ? "" : "?status=" + status), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const getBooking = async (id) => {
  const response = await axios.get(API_URL + "bookings/" + id);
  return response.data;
};

export const createBooking = async (
  customerName,
  customerEmail,
  date,
  time,
  peopleCount,
  notes
) => {
  const response = await axios.post(API_URL + "bookings", {
    customerName: customerName,
    customerEmail: customerEmail,
    date: date,
    time: time,
    peopleCount: peopleCount,
    notes: notes,
  });

  return response.data;
};

export const updateBooking = async (id, date, time, status, tableNumber, token) => {
  const response = await axios.put(
    API_URL + "bookings/" + id,
    {
      date: date,
      time: time,
      status: status,
      tableNumber: tableNumber,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const deleteBooking = async (id, token) => {
  const response = await axios.delete(API_URL + "bookings/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
