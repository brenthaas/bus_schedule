export const formatTimestamp = timestamp => {
  let time = new Date(2020, 2, 2);
  time.setMinutes(timestamp);
  return `${padWithZeros(time.getHours())}:${padWithZeros(time.getMinutes())}`
};

const padWithZeros = (number) => {
  const num = String(number);
  return num.length === 1 ? `0${num}` : num
};
