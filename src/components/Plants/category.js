import React from 'react';
import Button from '../Button';
import Item from './Item';
import { Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/Fetch';
import "./style.css";
import PropTypes from 'prop-types';
import headers from '../../data/fetchAttributes';

function Category(props) {
  const { isLoading, data } = useFetch(props.taxonomy ?
    process.env.REACT_APP_API_CAT_OF_TAX + props.taxonomy : null, headers);

  const returnState = ()=>{
    props.returnState("false");
  };

  return (
    <div className="text-center py-1">
      <h4 className="text-center pb-3"> Pasirink kriterijų</h4>
      {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4>
        <Spinner animation="border" /></div>) : (
        <div >
          <div className="d-flex flex-wrap flex-row justify-content-center text-center">
            {data.map((info, index) => (
              <Item key={index} {...info} taxonomy={props.taxonomy} />
            ))
            }
          </div>
        </div>
      )}
      <div className="py-5">
        <Button name={"Atgal"} color={"success"} onClick={returnState}></Button>
      </div>
    </div>
  );
}

Category.propTypes = {
  taxonomy: PropTypes.string.isRequired,
  returnState: PropTypes.func.isRequired,
};

export default Category;