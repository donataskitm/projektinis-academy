const formatLinkPart= (itemInStorage)=>{
  let apiLinkPart = '';
  itemInStorage.forEach( (item) => {
    apiLinkPart = apiLinkPart + item.category + "=" + item.id+"&";
  });
  return apiLinkPart;
};

export const makeApiEndpoint = {
  formatLinkPart
};