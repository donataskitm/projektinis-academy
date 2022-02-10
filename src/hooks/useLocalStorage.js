import { useState } from "react";
import { EstimateCounting } from "../services/estimateCounting";
import { convertDataType } from "../services/convertDataType";

const useLocalStorage = (keyName, defaultValue) => {

  const [storedValue, setStoredValue] = useState(() => {
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

  const setValue = newValue => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  const clearValue = (addedItem) => {
    setValue([...storedValue.filter((storedItem) => storedItem.id !== addedItem.id)]);
  };

  const clearAllValues = () => {
    setValue([]);
  };

  const addValue = (addedItem) => {

    let isFoundItem = storedValue.filter((storedItem) => storedItem.id === addedItem.id);
    let message;
    if (isFoundItem.length === 0) {
      addedItem["cost"]= 0;
      addedItem["area"]= 0;
      addedItem["totalQuantity"]= 0;
      addedItem["totalAmount"]= 0;
      storedValue.push(addedItem);
      setValue(storedValue);
      message="Pridėta į sąmatą";
    } else {
      message="Jau yra įtraukta į sąmatą";
    }
    return message;
  };

  const addKeyValue = (event, addedItem) => {
    const key = event.target.id;
    const value = parseFloat(event.target.value);

    storedValue.forEach(function (item) {
      let newKeys = [];
      newKeys.push((item.id === addedItem.id) ? item[key] = value : null);
      if (item.id === addedItem.id && key === "area") {
        const totalQuantity = EstimateCounting.countTotalQuantity(item, value);
        const totalPrice = totalQuantity *  item.cost;
        newKeys.push(item.totalQuantity = totalQuantity);
        newKeys.push(item.totalAmount = convertDataType.convertStringToNumber(totalPrice));
      }
      if (item.id === addedItem.id && key === "cost") {
        const totalPrice = item.totalQuantity * item.cost;
        newKeys.push(item.totalAmount = convertDataType.convertStringToNumber(totalPrice));
      }
      return newKeys;
    });
    setValue([...storedValue]);
  };

  return [storedValue, setValue, clearValue, clearAllValues, addValue, addKeyValue];
};

export default useLocalStorage;

