import React from 'react';
import { Spinner, Col } from 'react-bootstrap';
import useFetch from '../../hooks/Fetch';
import "./style.css";
import PropTypes from 'prop-types';
import headers from '../../data/fetchAttributes';

function TaxonomyName(props) {

  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_TAXONOMY + props.name, headers);
  return (
    <div className="text-center py-3">
      {isLoading ? (
        <div className="text-center mx-auto">
          <h4>Kraunama...</h4><Spinner animation="border" />
        </div>) : (
        <div >
          <div className="d-flex flex-wrap flex-row justify-content-center text-center">
            <Col xs={12}>{data.name}</Col>
          </div>
        </div>
      )}
    </div>
  );
}

TaxonomyName.propTypes = {
  name: PropTypes.string.isRequired,
};
  
export default TaxonomyName;