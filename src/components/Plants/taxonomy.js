import React from 'react';
import Item from './Item';
import { Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/Fetch';
import "./style.css";
import headers from '../../data/fetchAttributes';

function Taxonomy() {

  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_TAXONOMIES_URL, headers);

  return (
    <div className="text-center py-5">
            
      <h4 className="text-center pb-3"> Pasirink kategoriją želdynui kurti</h4>
      {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4><Spinner animation="border" /></div>) : (
        <div >
          <div className="d-flex flex-wrap flex-row justify-content-center text-center">
            {data.map((info, index) => (<Item key={index} {...info}  />
            ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Taxonomy;