import basePost from "./basePost";

export const chart = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/iot/data", body, onSuccess, onFailure);
};

export const current = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  const preprocess = (res, callback) => {
    const result = res.result[res.result.length - 1];

    callback(result);
  };

  basePost("/iot/data", body, res => preprocess(res, onSuccess), onFailure);
};
