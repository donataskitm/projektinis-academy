const addSelectOptInStorage = (event, itemInStorage, saveItemToStorage)=>{
  
  saveItemToStorage([...itemInStorage, {["category"]: event.target.id, ["id"]: event.target.value}]);
};

const deleteSelectOptInStorage = (selectedValue, itemInStorage, saveItemToStorage)=>{
  const value = selectedValue.category? selectedValue.category : selectedValue.target.id;
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

export const serviceFilterForm = {
  addSelectOptInStorage,
  deleteSelectOptInStorage,
  changeSelectOptInStorage
};