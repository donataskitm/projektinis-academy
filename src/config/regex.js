const regex = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  name: /^[A-Za-z0-9]{3,16}$/i,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,20}$/i,
  message: /^([\S\s]+){6,300}$/i,
  searchBar: /^(?:[A-Za-z]{3,})$/
};
export default regex;