import {
  fetchStarterList as fetchStarterListAPI,
  fetchSecondaryList as fetchSecondaryListAPI,
} from "./ApiServices";

export const FETCH_STARTER_LIST_SUCCESS = "FETCH_STARTER_LIST_SUCCESS";
export const FETCH_STARTER_LIST_ERROR = "FETCH_STARTER_LIST_ERROR";
export const FETCH_SECONDARY_LIST_SUCCESS = "FETCH_SECONDARY_LIST_SUCCESS";
export const FETCH_SECONDARY_LIST_ERROR = "FETCH_SECONDARY_LIST_ERROR";

export const fetchStarterList = () => {
  return async dispatch => {
    try {
      const data = await fetchStarterListAPI();
      dispatch({ type: FETCH_STARTER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_STARTER_LIST_ERROR, payload: error.message });
    }
  };
};

export const fetchSecondaryList = () => {
  return async dispatch => {
    try {
      const data = await fetchSecondaryListAPI();
      dispatch({ type: FETCH_SECONDARY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_SECONDARY_LIST_ERROR, payload: error.message });
    }
  };
};
