export default function handleInput(name, value, targetValue = null) {
  let valid = null;

  if (value.startsWith(" ")) return false;

  switch (name) {
    case "username":
      valid = value.match(/^[a-zA-Z0-9.\-_$@*!]{5,10}$/) ? true : false;
      break;
    case "password":
      valid = value.match(/^[a-zA-Z0-9!@#$%^&*]{5,15}$/) ? true : false;
      break;
    case "cfPassword":
      let targetValid = value.match(/^[a-zA-Z0-9!@#$%^&*]{5,15}$/)
        ? true
        : false;
      valid = value === targetValue && targetValid;
      break;
    case "last_name":
    case "first_name":
      valid = value.match(/^[a-zA-Z0-9 ]{3,30}$/) ? true : false;
      break;
    case "email":
      valid = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value)
        ? true
        : false;
      break;
    case "phone_number":
      valid = value.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      )
        ? true
        : false || value.startsWith("+");
      break;
    case "address":
      valid = value.match(/^[a-zA-Z0-9,/ .\-_$@*!]{3,100}$/) ? true : false;
      break;
    default:
      return null;
  }

  return valid;
}
