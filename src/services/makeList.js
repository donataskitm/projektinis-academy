const  makeItemsPerPageList = (start, end)=>{
  let listBoxItemsArray = [];
  let listBoxItem;
  for (listBoxItem = start; listBoxItem < end; listBoxItem = listBoxItem + listBoxItem){
    listBoxItemsArray.push(listBoxItem);
  }
  listBoxItemsArray.push(listBoxItem);
  return listBoxItemsArray;
};
  
export default makeItemsPerPageList;