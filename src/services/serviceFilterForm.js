const addSelectedValue= (event, savedValue, setValue)=>{
  
  setValue([...savedValue, {["category"]: event.target.id, ["id"]: event.target.value}]);
};

const deleteSelectedValue = (selectedValue, savedValue, setValue)=>{
  const value = selectedValue.category? selectedValue.category : selectedValue.target.id;
  setValue( savedValue.filter(storedItem => storedItem.category !==  value));
};

const changeSelectedValue= (event,savedValue, setValue)=>{

  savedValue.forEach( (item) => {
    let newKey = [];
    newKey.push((item.category === event.target.id) ? item["id"] = event.target.value : null);
    return newKey;
  });
  setValue([...savedValue]);
};

export const serviceFilterForm = {
  addSelectedValue,
  deleteSelectedValue,
  changeSelectedValue
};