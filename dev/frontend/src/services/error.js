import * as CONST from "./const";

export default function(code) {
  if (!code) return "Unknow error!";

  const message = `Code ${code}: ` + CONST.ERRORS[`C${code}`];

  return message;
}
