import { Methods } from "../enums/Enums";

const BACKEND_APP_URL = process.env.REACT_APP_BACKEND_URL;

const createRequestOptions = (method: Methods, body?: {}) => {
  const requestOptions: RequestInit = {
    method: method.toString(),
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: undefined,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  return requestOptions;
};

const createRequest = (url: string, method: Methods, body?: {}) => {
  const requestOptions = createRequestOptions(method, body);
  return fetch(BACKEND_APP_URL + url, requestOptions);
};

export { createRequest };
