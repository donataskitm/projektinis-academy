import {SQUARE_CM_PER_SQUARE_M} from '../config/constants';

const STRING_TO_NUMBER = 1;

const convertStringToNumber = (number) => {
  const convertedNumber = parseFloat(number).toFixed(2) * STRING_TO_NUMBER;
  return (convertedNumber);
};

const countTotal = (savedValue) => {
  let total = 0;
  savedValue.forEach(function (item) {
    total = total + item.totalAmount;
  });
  return serviceFunctions.convertStringToNumber(total);
};

const countTotalQuantity = (item, value) => {
  let quantity = value / (item.planting_space_from * item.planting_space_to / SQUARE_CM_PER_SQUARE_M);
  return Math.ceil(quantity);
};

export const serviceFunctions = {
  convertStringToNumber,
  countTotal,
  countTotalQuantity
};