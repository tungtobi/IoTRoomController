import { PROXY, BASE, POST } from "./const";

function basePost(endpoint, body, onSuccess, onFailure = console.log) {
  const url = PROXY + BASE + endpoint;

  fetch(url, {
    method: POST,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      console.log(`Fetch ${endpoint} then get response`);
      console.log(data);

      if (data.error_code === 0) onSuccess(data, body);
      else onFailure();
    })
    .catch(onFailure);
}

export default basePost;