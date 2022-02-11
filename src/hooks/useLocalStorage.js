import { useState } from "react";

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

  return [itemInStorage, 
    saveItemToStorage, 
    clearItemFromStorage, 
    clearAllItemsFromStorage, 
  ];
};

export default useLocalStorage;



