const STRING_TO_NUMBER = 1;

const convertStringToNumber = (number) => {
  const convertedNumber = parseFloat(number).toFixed(2) * STRING_TO_NUMBER;
  return (convertedNumber);
};

export const convertDataType = {
  convertStringToNumber
};