function is_array(value) {
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return true;
  } else return false;
}

export const DataTypeChecker = {
  is_array
};