import React, {useState} from "react";
import "./style.css";
import PropTypes from 'prop-types';
import { HeaderContext } from "../../contexts/context";
import Header from "./Header";
import useLocalStorage from "../../hooks/useLocalStorage";

const Layout = (props) => {

  const [itemInStorage] = useLocalStorage("samata", []);
  const [itemsNumber, setItemsNumber] = useState(itemInStorage.length);
  const [login, setLogin] = useState(() => {
    const initialState = isToken();
    return initialState;
  });
  
  const returnItems = (number) => { 
    setItemsNumber(number);
  };

  const returnLogin = (isLogged) => {
    setLogin(isLogged);
  };

  return (
    <div className="main">
      <HeaderContext.Provider
        value={{
          returnItems, returnLogin
        }}>
        <Header number={itemsNumber} login={login}/>
        {props.children}
      </HeaderContext.Provider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Layout;
//TODO: remove to functions
function isToken() {
  let token =  window.localStorage.getItem("token")? true: false;
  return token;
}