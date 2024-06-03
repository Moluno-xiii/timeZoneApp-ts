const convertTimeString = (dateString: string) => {
  if (!dateString) {
    return { newTime: "", date: "" };
  }
  const [date, timeString] = dateString.split("T");
  const time = timeString.split(".")[0];

  let [hour, minute] = time.split(":").map(Number);

  let suffix = hour < 12 ? "AM" : "PM";

  if (hour === 0) {
    hour = 12;
  } else if (hour === 12) {
    suffix = "PM";
  } else {
    hour %= 12;
  }

  const newTime = `${hour}:${minute} ${suffix}`;
  return { newTime, date };
};

export { convertTimeString };
