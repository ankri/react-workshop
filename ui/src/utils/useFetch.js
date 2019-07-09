import { useReducer, useEffect } from 'react';

const initialState = {
  url: null,
  postData: null,
  loadCounter: 0,
  postCounter: 0,
  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
  data: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isIdle: false,
        isLoading: true,
        isSuccess: false,
        isError: false,
        data: null,
        error: null
      };
    case 'LOADING_FINISHED_SUCCESS':
      return {
        ...state,
        postData: null,
        isIdle: false,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
        data: action.data
      };
    case 'LOADING_FINISHED_ERROR':
      return {
        ...state,
        postData: null,
        isIdle: false,
        isError: true,
        isLoading: false,
        isSuccess: false,
        error: action.error,
        data: null
      };
    case 'LOAD':
      return {
        ...state,
        loadCounter:
          state.url !== action.url ? state.loadCounter + 1 : state.loadCounter,
        url: action.url,
        postData: null,
        isIdle: false,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
      };
    case 'POST':
      return {
        ...state,
        postCounter: state.postCounter + 1,
        url: action.url,
        postData: action.data,
        isIdle: false,
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
      };
    case 'RELOAD':
      return {
        ...state,
        loadCounter: state.loadCounter + 1,
        postData: null,
        isIdle: false,
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
      };
    default:
      return state;
  }
};

export const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const load = async () => {
      if (state.url && state.loadCounter > 0) {
        dispatch({ type: 'LOADING' });
        const response = await fetch(state.url);
        const isJson = response.headers
          .get('content-type')
          .toLowerCase()
          .startsWith('application/json');

        if (response.ok) {
          dispatch({
            type: 'LOADING_FINISHED_SUCCESS',
            data: isJson ? await response.json() : await response.text()
          });
        } else {
          dispatch({
            type: 'LOADING_FINISHED_ERROR',
            error: isJson
              ? { status: response.status, message: await response.json() }
              : { status: response.status, message: await response.text() }
          });
        }
      }
    };

    load();
  }, [state.url, state.loadCounter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const post = async () => {
      if (state.url && state.postCounter > 0) {
        dispatch({ type: 'LOADING' });
        const response = await fetch(state.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state.postData)
        });
        const isJson = response.headers
          .get('content-type')
          .toLowerCase()
          .startsWith('application/json');

        if (response.ok) {
          dispatch({
            type: 'LOADING_FINISHED_SUCCESS',
            data: isJson ? await response.json() : await response.text()
          });
        } else {
          dispatch({
            type: 'LOADING_FINISHED_ERROR',
            error: isJson
              ? { status: response.status, message: await response.json() }
              : { status: response.status, message: await response.text() }
          });
        }
      }
    };

    post();
  }, [state.url, state.postCounter]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isIdle: state.isIdle,
    isLoading: state.isLoading,
    isError: state.isError,
    isSuccess: state.isSuccess,
    error: state.error,
    data: state.data,
    load: url => {
      dispatch({ type: 'LOAD', url });
    },
    post: (url, data) => {
      dispatch({ type: 'POST', url, data });
    },
    reload: () => {
      dispatch({ type: 'RELOAD' });
    }
  };
};
