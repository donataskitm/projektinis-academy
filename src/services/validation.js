import formConst  from "../config/formConst";
import regex from "../config/regex";

function isValidRegex (input, regex){
  const isValid = !regex.test(input);
  return isValid;
}

function isSamePassword(password, repassword) {
  return password === repassword;
}

//TODO: code optimization
const validateContactForm = (inputs) => {
  const errors = {};
  
  if( isValidRegex (inputs.email, regex.email)){
    errors.email = formConst.EMAIL_FIELD_MESSAGE;
  }

  if( isValidRegex (inputs.message, regex.message)){
    errors.message = formConst.MESSAGE_FIELD_MESSAGE;
  }

  if( isValidRegex (inputs.name, regex.name)){
    errors.name = formConst.NAME_FIELD_MESSAGE;
  }
  
  return errors;
};

const validateLoginForm = (inputs) => {

  const errors = {};
  
  if(isValidRegex(inputs.name, regex.name)){ 
    errors.name = formConst.NAME_FIELD_MESSAGE;
  }

  if(isValidRegex(inputs.password, regex.password)){ 
    errors.password = formConst.PASSWORD_FIELD_MESSAGE;
  }
 
  return errors;
};

const validateRegisterForm = (inputs) => {

  const errors = {};
  
  if(isValidRegex(inputs.email, regex.email)){ 
    errors.email = formConst.EMAIL_FIELD_MESSAGE;
  }

  if(isValidRegex(inputs.name, regex.name)){ 
    errors.name = formConst.NAME_FIELD_MESSAGE;
  }

  if(isValidRegex(inputs.password, regex.password)){ 
    errors.password = formConst.PASSWORD_FIELD_MESSAGE;
  }

  if(!isSamePassword(inputs.password, inputs.repassword) || !inputs.repassword){
    errors.repassword = formConst.REPASSWORD_FIELD_MESSAGE;
  }
  
  return errors;
};

const validateSearchBar = (inputs) => {
  const errors = {};
  if(isValidRegex (inputs.searchInput, regex.searchBar)){
    errors.searchInput = formConst.SEARCH_BAR_MESSAGE;
  }
  return errors;
};

export const validate = {
  validateContactForm,
  validateLoginForm,
  validateRegisterForm,
  validateSearchBar
};
