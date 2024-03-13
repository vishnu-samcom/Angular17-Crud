import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.baseURL;
export const API_ENDPOINTS = {
  API_GET_USERS: '/users',
  API_GET_SINGLE_USER: '/users',
  API_ADD_USER: '/users',
  API_UPDATE_USER: '/users',
  API_DELETE_USER: '/users',
  API_GET_PRODUCTS: '/products',
};
