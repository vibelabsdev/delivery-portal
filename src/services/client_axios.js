import axios from "axios";
import queryString from "query-string";

import { history, LocalStorageService } from "../helpers";
const localStorageService = LocalStorageService.getService();

const defaultHeader = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  //'versionapp': localStorage.getItem("versionapp") || '1.0.0',

  // 'clientid': process.env.REACT_APP_CLIENT_ID,
  // 'hashcode': process.env.REACT_APP_CLIENT_HASH,
  // 'versionos': osVersion + ' ' + osName,
  // 'devicename': deviceName
};

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
console.log('-------API_ENDPOINT------', API_ENDPOINT)

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: defaultHeader,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.defaults.headers.common['X-HTTP-Method-Override'] = 'POST';
axiosClient.defaults.headers.common['X-Forwarded-Method'] = 'POST';


const handleResponse = (res) => {
  console.log("handleResponse",res);
  if (res && res.data) {
    return res.data;
  }

  return res;
};

const handleError = (error) => {
  const { data } = error.response;

  if (data && data.error_code === "USER_LOCKED_USING") {
    clearAuthToken();
  }

  return data;
};

const clearAuthToken = () => {
  LocalStorageService.clearToken();
  history.push("/login");
};

export default axiosClient;
