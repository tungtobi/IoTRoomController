import basePost from "./basePost";

export const data = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/iot/data", body, onSuccess, onFailure);
};
