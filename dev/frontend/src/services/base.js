import { PROXY, BASE, POST, GET } from "./const";

export const post = (endpoint, body, onSuccess, onFailure) => {
  const url = `${PROXY}${BASE}:3000${endpoint}`;

  fetch(url, {
    method: POST,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "http://localhost"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      if (data.error_code === 0) onSuccess(data, body);
      else onFailure(data);
    })
    .catch(onFailure);
};

export const get = (endpoint, onSuccess, onFailure) => {
  const url = `${PROXY}${BASE}${endpoint}`;

  fetch(url, {
    method: GET,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "http://localhost"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.error_code === 0) onSuccess(data);
      else onFailure(data);
    })
    .catch(onFailure);
};
