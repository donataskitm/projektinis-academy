const  makeList = (start, end)=>{
  let listBoxItemsArray = [];
  let listBoxItem;
  for (listBoxItem = start; listBoxItem < end; listBoxItem=listBoxItem+listBoxItem){
    listBoxItemsArray.push(listBoxItem);
  }
  
  // listBoxItemsArray.map((item)=>{
  //   console.log(item);
  // });
  return listBoxItemsArray;
};
  
export default makeList;