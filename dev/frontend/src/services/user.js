import basePost from "./basePost";

export const list = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/admin/list-user", body, onSuccess, onFailure);
};

export const add = () => {};

export const view = () => {};

export const modify = () => {};

export const changePassword = (password, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    password
  };

  basePost("/admin/modify-user", body, onSuccess, onFailure);
};

export const lock = (username, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  basePost("/admin/lock-user", body, onSuccess, onFailure);
};

export const unlock = (username, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  basePost("/admin/unlock-user", body, onSuccess, onFailure);
};
