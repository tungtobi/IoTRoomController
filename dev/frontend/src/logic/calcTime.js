const calcTimeUpdated = past => {
  const current = new Date();

  const deltaHour = current.getHours - past.hours;
  const deltaMinutes = current.getMinutes - past.minutes;
  const deltaSecond = current.getSeconds - past.seconds;

  let text;

  const deltaTime = deltaHour * 3600 + deltaMinutes * 60 + deltaSecond;

  if (deltaTime >= 7200)
    text = Math.floor(deltaTime / 3600).toString() + " hours ago";
  else if (deltaTime >= 3600)
    text = Math.floor(deltaTime / 3600).toString() + " hour ago";
  else if (deltaTime >= 120)
    text = Math.floor(deltaTime / 60).toString() + " minutes ago";
  else if (deltaTime >= 60)
    text = Math.floor(deltaTime / 60).toString() + " minute ago";
  else text = "Updated";

  return text;
};

export default calcTimeUpdated;
