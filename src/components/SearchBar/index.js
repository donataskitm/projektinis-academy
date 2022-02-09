import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useLocalStorage from '../../hooks/useLocalStorage';

function SearchBar(props) {

  const navigate = useNavigate();
  let textInput = React.createRef();
  
  const [, setValue] = useLocalStorage("input", []);
  
  const redirectSearch = () => {
    const form = textInput.current;
    const inputValue = form['searchInput'].value;
    const apiLink = process.env.REACT_APP_API_SEARCH + inputValue;
    setValue([]);
    navigate('/atranka', { state: { apiLink: apiLink } });
  };
  
  return (
    <Row className=" bg-opacity-50 py-4 align-items-center justify-content-center align-items-center gx-0">
      <Col sm={3} className="my-1">
        <Form ref={textInput}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="mt-3"
              name={'searchInput'}
              placeholder={props.placeholder}
              onKeyPress={(event) => event.key === 'Enter' && redirectSearch()} />
          </Form.Group>
        </Form>
      </Col>
      <Col xs="auto" className="my-1">
        <Button
          name={"Ieškoti"}
          color={"success"}
          onClick={redirectSearch} />
      </Col>
    </Row>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchBar;