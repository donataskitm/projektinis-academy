import { EstimateCounter } from "./estimateCounter";
import { DataTypeConverter } from "./dataTypeConverter";
import {FIXED_NUMBER_TWO} from '../config/constants';

const addValueToItem = (addedItem, itemInStorage, saveItemToStorage) => {

  let isFoundItem = itemInStorage.filter((storedItem) => storedItem.id === addedItem.id);
  let message;
  if (isFoundItem.length === 0) {
    addedItem["cost"]= 0;
    addedItem["area"]= 0;
    addedItem["totalQuantity"]= 0;
    addedItem["totalAmount"]= 0;
    itemInStorage.push(addedItem);
    saveItemToStorage(itemInStorage);
    message="Pridėta į sąmatą";
  } else {
    message="Jau yra įtraukta į sąmatą";
  }
  return message;
};


const addKeyValueToItem = (event, addedItem, itemInStorage, saveItemToStorage) => {
  const key = event.target.id;
  const value = parseFloat(event.target.value);

  itemInStorage.forEach(function (item) {
    let newKeys = [];
    newKeys.push((item.id === addedItem.id) && (item[key] = value));
    if (item.id === addedItem.id && key === "area") {
      const totalQuantity = EstimateCounter.countTotalQuantity(item, value);
      const totalPrice = totalQuantity *  item.cost;
      newKeys.push(item.totalQuantity = totalQuantity);
      newKeys.push(item.totalAmount = DataTypeConverter.convertStringToNumber(totalPrice, FIXED_NUMBER_TWO));
    }
    if (item.id === addedItem.id && key === "cost") {
      const totalPrice = item.totalQuantity * item.cost;
      newKeys.push(item.totalAmount = DataTypeConverter.convertStringToNumber(totalPrice, FIXED_NUMBER_TWO));
    }
    return newKeys;
  });
  saveItemToStorage([...itemInStorage]);
};


export const EstimateStorage = {
  addValueToItem,
  addKeyValueToItem
};