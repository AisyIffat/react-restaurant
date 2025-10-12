import axios from "axios";

import { API_URL } from "./constants";

export async function getProducts(category) {
  const response = await axios.get(
    API_URL +
      "products" +
      (category === "all" ? "" : "?category=" + category)
  );
  return response.data;
}

export async function getProduct(id) {
  const response = await axios.get(API_URL + "products/" + id);
  return response.data;
}

export async function addProduct(
  name,
  price,
  category,
  image,
  token
) {
  const response = await axios.post(
    API_URL + "products",
    {
      name: name,
      price: price,
      category: category,
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function updateProduct(
  id,
  name,
  price,
  category,
  image,
  token
) {
  const response = await axios.put(
    API_URL + "products/" + id,
    {
      name: name,
      price: price,
      category: category,
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function deleteProduct(id, token) {
  const response = await axios.delete(API_URL + "products/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
