import { LocalStorageService } from "helpers";
import axiosClient from "./client_axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const route = "/delivery-service/user";

export const authService = {
  login: (params) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    };
    return fetch(`${API_ENDPOINT}${route}/login`, requestOptions);
  },

  logout: () => {
    const token = LocalStorageService.getAccessToken()
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer '+ token
      }
    };
    return fetch(`${API_ENDPOINT}${route}/sign-out`, requestOptions);
  }
};
