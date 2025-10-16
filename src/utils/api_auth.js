import axios from "axios";

import { API_URL } from "./constants";

export async function getUsers () {
  const response = await axios.get(API_URL + "users");
  return response.data;
};

export const updateUser = async (_id, name, email, role) => {
  const response = await axios.put( API_URL + "users/" + _id, {
    name,
    email,
    role,
  });
  return response.data;
};

export async function deleteUser(_id) {
  const response = await axios.delete( API_URL + "users/" + _id );
  return response.data;
}

export const login = async (email, password) => {
  const response = await axios.post(API_URL + "users/login", {
    email,
    password,
  });

  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(API_URL + "users/signup", {
    name,
    email,
    password,
  });

  return response.data;
};