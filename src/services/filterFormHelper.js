const addSelectOptInStorage = (event, itemInStorage, saveItemToStorage)=>{
  saveItemToStorage([...itemInStorage, {["category"]: event.target.id, ["id"]: event.target.value}]);
};

const addSelectionInStorage = (id, category, saveItemToStorage)=>{
  saveItemToStorage([{["category"]: category, ["id"]: id}]);
};

const deleteSelectOptInStorage = (selectedItem, itemInStorage, saveItemToStorage)=>{
  const value = selectedItem.category? selectedItem.category : selectedItem.target.id;
  saveItemToStorage(itemInStorage.filter(storedItem => storedItem.category !==  value));
};

const changeSelectOptInStorage = (event, itemInStorage, saveItemToStorage)=>{
  itemInStorage.forEach( (item) => {
    let newKey = [];
    newKey.push((item.category === event.target.id) && (item["id"] = event.target.value));
    return newKey;
  });
  saveItemToStorage([...itemInStorage]);
};

export const FilterFormHelper = {
  addSelectOptInStorage,
  deleteSelectOptInStorage,
  changeSelectOptInStorage,
  addSelectionInStorage,
};