import {SQUARE_CM_PER_SQUARE_M} from '../config/constants';
import { DataTypeConverter } from './dataTypeConverter';


const countTotal = (savedValue) => {
  let total = 0;
  savedValue.forEach(function (item) {
    total = total + item.totalAmount;
  });
  return DataTypeConverter.convertStringToNumber(total);
};

const countTotalQuantity = (item, value) => {
  let quantity = value / (item.planting_space_from * item.planting_space_to / SQUARE_CM_PER_SQUARE_M);
  return Math.ceil(quantity);
};

export const EstimateCounter = {
  countTotal,
  countTotalQuantity
};