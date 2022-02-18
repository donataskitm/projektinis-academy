
import React from 'react';
import Item from './Item';
import useFetch from '../../hooks/Fetch';
import {Form, Spinner} from 'react-bootstrap';
import headers from '../../data/fetchAttributes';

const FilterForm = () => {

  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_TAXONOMIES_URL, headers);
  
  return (
    <div className="text-center py-5 ">
      <h4 className="text-center pb-3"> Filtruok</h4>
      <Form>
        {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4><Spinner animation="border" /></div>) : (
          <div>
            {data.map((info, index) => (<Item key={index} {...info} />
            ))
            }
          </div>
        )}
      </Form>
    </div>
  );
};
export default FilterForm;