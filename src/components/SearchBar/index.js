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
      navigate('/atranka', { state: { apiLink: apiLink } });
    } 
  };

  const {inputs, 
    handleInputChange, 
    handleSubmit, 
    errors} = useForm(initialState, validate.validateSearchBar, redirectSearch);
  const [, saveItemToStorage] = useLocalStorage("input", []);
  
  return (
    <Row className="py-5 gx-0">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2 pb-2 m-auto">
          
          <Form.Group  controlId="formBasicSearch">
            <Col  xs="10" md="6" lg="4" className="d-flex m-auto justify-content-center">
              <Form.Control
                
                name="searchInput"
                placeholder={props.placeholder}
                onChange={handleInputChange}
                value={inputs.searchInput}
                onKeyPress={(event) => event.key === 'Enter' && handleSubmit} /> 
              <Button
                name={"Ieškoti"}
                color={"success"}/>
            </Col>
          </Form.Group>
          
         
        </Row>
      </Form>
      <Col className="text-center">
        {<ErrorMessage message={errors.searchInput} color="text-white"/>}
      </Col>
    </Row>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchBar;