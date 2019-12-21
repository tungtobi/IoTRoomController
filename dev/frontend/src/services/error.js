import * as CONST from "./const";

export default function(res) {
  if (!res || !res.error_code) return "Unknow error!";

  const message =
    `Code ${res.error_code}: ` + CONST.ERRORS[`C${res.error_code}`];

  return message;
}
