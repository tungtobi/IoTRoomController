import basePost from "./basePost";

export const list = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/admin/list-user", body, onSuccess, onFailure);
};

export const add = (user, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    ...user
  };

  console.log(body);

  basePost("/admin/add-user", body, onSuccess, onFailure);
};

export const remove = (username, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  basePost("/admin/delete-user", body, onSuccess, onFailure);
};

export const view = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/user/info", body, onSuccess, onFailure);
};

export const modify = (info, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    ...info
  };

  basePost("/admin/modify-user", body, onSuccess, onFailure);
};

export const modifySelf = (info, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    ...info
  };

  basePost("/user/modify-user", body, onSuccess, onFailure);
};

export const changePassword = (username, password, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username,
    password
  };

  basePost("/admin/modify-user", body, onSuccess, onFailure);
};

export const changeSelfPassword = (password, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    password
  };

  basePost("/user/modify-user", body, onSuccess, onFailure);
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

export const data = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/iot/data", body, onSuccess, onFailure);
};
