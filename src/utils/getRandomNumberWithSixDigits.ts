export const getRandomNumberWithSixDigits = () => {
  const number = Math.floor(Math.random() * 900000) + 100000;
  return number.toString();
};
