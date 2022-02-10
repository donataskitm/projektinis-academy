const formatLinkPart= (savedValue)=>{
  let apiLinkPart = '';
  savedValue.forEach( (item) => {
    apiLinkPart = apiLinkPart + item.category + "=" + item.id+"&";
  });
  return apiLinkPart;
};

export const makeApiEndpoint = {
  formatLinkPart
};