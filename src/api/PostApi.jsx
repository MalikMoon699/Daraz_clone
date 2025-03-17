import axios from "axios";
import { API_Endpoints } from "./url";

export const getPost = async () => {
  return axios.get(API_Endpoints);
};

export const postData = async (baseURL) => {
  return axios.post(API_Endpoints, baseURL);
};

export const putData = async (id, baseURL) => {
  return axios.put(`${API_Endpoints}/${id}`, baseURL);
};

export const deleteData = async (id) => {
  return axios.delete(`${API_Endpoints}/${id}`);
};
