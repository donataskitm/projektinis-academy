const addSelectOptInStorage = (event, savedValue, setValue)=>{
  
  setValue([...savedValue, {["category"]: event.target.id, ["id"]: event.target.value}]);
};

const deleteSelectOptInStorage = (selectedValue, savedValue, setValue)=>{
  const value = selectedValue.category? selectedValue.category : selectedValue.target.id;
  setValue( savedValue.filter(storedItem => storedItem.category !==  value));
};

const changeSelectOptInStorage = (event, savedValue, setValue)=>{

  savedValue.forEach( (item) => {
    let newKey = [];
    newKey.push((item.category === event.target.id) && (item["id"] = event.target.value));
    return newKey;
  });
  setValue([...savedValue]);
};

export const serviceFilterForm = {
  addSelectOptInStorage,
  deleteSelectOptInStorage,
  changeSelectOptInStorage
};