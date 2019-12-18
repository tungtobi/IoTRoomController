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

  basePost("/admin/add-user", body, onSuccess, onFailure);
};

export const remove = (username, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  basePost("/admin/delete-user", body, onSuccess, onFailure);
};

export const view = (username, onSuccess, onFailure) => {
  const filter = res => {
    for (var propName in res) {
      if (propName.startsWith("user_")) {
        if (res[propName].username === username) {
          onSuccess(res[propName]);
        }
      }
    }
  };

  list(filter, onFailure);
};

export const modify = (info, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    ...info
  };

  basePost("/admin/modify-user", body, onSuccess, onFailure);
};

export const changePassword = (username, password, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username,
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
