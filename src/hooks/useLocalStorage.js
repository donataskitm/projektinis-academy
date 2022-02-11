import { useState } from "react";
import { EstimateCounter } from "../services/estimateCounter";
import { DataTypeConverter } from "../services/dataTypeConverter";

const useLocalStorage = (keyName, defaultValue) => {

  const [itemInStorage, setItem] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  }
  );

  const saveItemToStorage = newItem => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newItem));
    } catch (err) {
      console.log(err);
    }
    setItem(newItem);
  };

  const clearItemFromStorage = (addedItem) => {
    saveItemToStorage([...itemInStorage.filter((storedItem) => storedItem.id !== addedItem.id)]);
  };

  const clearAllItemsFromStorage = () => {
    saveItemToStorage([]);
  };

  const addValueToItem = (addedItem) => {

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

  const addKeyValueToItem = (event, addedItem) => {
    const key = event.target.id;
    const value = parseFloat(event.target.value);

    itemInStorage.forEach(function (item) {
      let newKeys = [];
      newKeys.push((item.id === addedItem.id) ? item[key] = value : null);
      if (item.id === addedItem.id && key === "area") {
        const totalQuantity = EstimateCounter.countTotalQuantity(item, value);
        const totalPrice = totalQuantity *  item.cost;
        newKeys.push(item.totalQuantity = totalQuantity);
        newKeys.push(item.totalAmount = DataTypeConverter.convertStringToNumber(totalPrice));
      }
      if (item.id === addedItem.id && key === "cost") {
        const totalPrice = item.totalQuantity * item.cost;
        newKeys.push(item.totalAmount = DataTypeConverter.convertStringToNumber(totalPrice));
      }
      return newKeys;
    });
    saveItemToStorage([...itemInStorage]);
  };

  return [itemInStorage, 
    saveItemToStorage, 
    clearItemFromStorage, 
    clearAllItemsFromStorage, 
    addValueToItem, 
    addKeyValueToItem];
};

export default useLocalStorage;

