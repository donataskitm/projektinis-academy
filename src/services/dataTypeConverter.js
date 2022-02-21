const STRING_TO_NUMBER = 1;

const convertStringToNumber = (number, fixedNumber) => {
  const convertedNumber = parseFloat(number).toFixed(fixedNumber) * STRING_TO_NUMBER;
  return (convertedNumber);
};

export const DataTypeConverter = {
  convertStringToNumber
};