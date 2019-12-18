import * as CONST from "./const";

export default function(code) {
  const message = `Code ${code}: ` + CONST.ERRORS[`C${code}`];

  return message;
}
