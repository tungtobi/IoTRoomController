export default function handleInput(name, value, targetValue = null) {
  let valid = null;

  switch (name) {
    case "username":
      valid = value.match(/^[a-zA-Z0-9.\-_$@*!]{3,30}$/) ? true : false;
      break;
    case "password":
      valid = value.length >= 5;
      break;
    case "cfPassword":
      let targetValid = value.length >= 6;
      valid = value === targetValue && targetValid;
      break;
    case "name":
      valid = value.match(/^[a-zA-Z0-9 ]{3,30}$/) ? true : false;
      break;
    default:
      return null;
  }

  return valid;
}
