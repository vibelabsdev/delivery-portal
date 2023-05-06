import { authTypes } from "../types";
import { getSubDomain } from "../utils/lib";

const initialState = {
  error: null,
  loading: false,
  dataLogin: null,
  domain: getSubDomain(),
  userProfile: null,
};

export function auth(state = initialState, action) {
  console.log('----action-----', action)
  switch (action.type) {
    case authTypes.AUTH_LOGIN_REQUEST:
      console.log('--------auth.reducer has work----')
      return {
        ...state,
        loading: true,
      };

    case authTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        dataLogin: action.payload,
        error: null,
      };

    case authTypes.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        dataLogin: null,
        error: action.error,
      };
    case authTypes.AUTH_LOGOUT:
      return {
        ...state,
        dataLogin: null,
      };

    //PROFILE
    case authTypes.AUTH_GET_PROFILE_REQUEST:
      return {
        ...state,
      };

    case authTypes.AUTH_GET_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      };

    case authTypes.AUTH_GET_PROFILE_FAILURE:
      return {
        ...state,
        userProfile: null,
      };

    case authTypes.GET_SUBDOMAIN_SUCCESS:
      return {
        ...state,
        domain: action.payload
      };

    default:
      return state;
  }
}
