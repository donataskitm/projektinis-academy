function sortItems(listBoxItem, data){
  data.sort((item, nextItem) => {
    switch(Number(listBoxItem)){
    case 0: return  item.lt_name.localeCompare(nextItem.lt_name); 
    case 1: return  nextItem.lt_name.localeCompare(item.lt_name);
    case 2: return  item.lot_name.localeCompare(nextItem.lot_name);
    case 3: return  nextItem.lot_name.localeCompare(item.lot_name);
    } 
  });
}

export default sortItems;