export default function handleInput(name, value, targetValue = null) {
  let valid = null;

  switch (name) {
    case "username":
      valid = value.match(/^[a-zA-Z0-9.\-_$@*!]{3,30}$/) ? true : false;
      break;
    case "password":
      valid = value.length >= 6;
      break;
    case "cfPassword":
      let targetValid = value.length >= 6;
      valid = value === targetValue && targetValid;
      break;
    case "name":
      valid = value.match(/^[a-zA-Z0-9 ]{3,30}$/) ? true : false;
      break;
    case "email":
      valid = value.match(/^[\@.]$/) ? true : false;
    case "phone_number":
      valid = value.match(/^[0-9]$/) ? true : false;
    case "address":
      valid = value.match(/^[a-zA-Z0-9.\-_$@*!]{3,30}$/) ? true : false;

    default:
      return null;
  }

  return valid;
}
