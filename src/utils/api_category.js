import axios from "axios";

import { API_URL } from "./constants";

export async function getCategories () {
  const response = await axios.get(API_URL + "categories");
  return response.data;
};

export const addCategory = async (label) => {
  const response = await axios.post(API_URL + "categories", {
    label,
  });

  return response.data;
};

export const updateCategory = async (_id, label) => {
  const response = await axios.put( API_URL + "categories/" + _id, {
    label,
  });
  return response.data;
};

export async function deleteCategory(_id) {
  const response = await axios.delete( API_URL + "categories/" + _id );
  return response.data;
}