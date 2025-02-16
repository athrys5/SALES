import { BACKEND_APP_LOCALHOST } from "../constants/url";
import { Methods } from "../enums/Enums";

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
  return fetch(BACKEND_APP_LOCALHOST + url, requestOptions);
};

export { createRequest };
