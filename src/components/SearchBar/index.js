import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useLocalStorage from '../../hooks/useLocalStorage';
import { validate } from '../../services/validation';
import ErrorMessage from '../ErrorMessage';
import useForm from '../../hooks/useForm';

function SearchBar(props) {

  const navigate = useNavigate();
  const initialState = {searchInput:''};

  const redirectSearch = (errors) => {
    if (Object.keys(errors).length === 0){
      const apiLink = process.env.REACT_APP_API_SEARCH + inputs.searchInput;
      saveItemToStorage([]);
      props.onClick();
      navigate('/atranka', { state: { apiLink: apiLink, searchKey: inputs.searchInput} });
    } 
  };

  const {inputs, 
    handleInputChange, 
    handleSubmit, 
    errors} = useForm(initialState, validate.validateSearchBar, redirectSearch);
  const [, saveItemToStorage] = useLocalStorage("input", []);
  
  return (
    <Row className="gx-0 justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2 pb-2 ">
          <Form.Group  controlId="formBasicSearch">
            <Col  className="d-flex m-auto pt-2 ">
              <Form.Control
                name="searchInput"
                placeholder={props.placeholder}
                onChange={handleInputChange}
                value={inputs.searchInput}
                onKeyPress={(event) => event.key === 'Enter' && handleSubmit} /> 
              <Button
                name={ <img
                  src="/pic/search.png"
                  className='img-fluid estimate-img'
                  alt='search'
                  width="30px"/>}
                color={"success"}
                onclick={props.onClick}
              />
            </Col>
            <Col className="text-center">
              {<ErrorMessage message={errors.searchInput} color={props.errorColor}/>}
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </Row>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  errorColor: PropTypes.string
};

SearchBar.defaultProps ={
  onClick: ()=>{},
  errorColor: "text-danher"
};

export default SearchBar;