
import React from 'react';
import Item from './Item';
import useFetch from '../../hooks/Fetch';
import {Form, Spinner, Col} from 'react-bootstrap';
import headers from '../../data/fetchAttributes';
import SearchBar from '../../components/SearchBar';
import { CategoryContext } from '../../contexts/context';

const FilterForm = () => {

  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_TAXONOMIES_URL, headers);

  const value = React.useContext(CategoryContext);

  const clearFilters = () => {
    value.deleteAllSelections();
    value.recalculatePagination();
  };
  
  return (
    <div className="text-center py-5 gx-0 ">
      {isLoading ? (<div className="text-center  mx-auto"><h4>Kraunama...</h4><Spinner animation="border" /></div>) : (
        <>
          <h4 className="text-center pb-3"> Filtruok</h4>
          <Form >
            <div>
              {data.map((info, index) => (<Item key={index} {...info} />
              ))}
            </div>
          </Form>
          <h4 className="text-center pt-4 mx-auto">Ieškok</h4>
          <Col className="px-3">
            <SearchBar placeholder="Įvesk augalo vardą" onClick={clearFilters} errorColor="text-secondary"/>
          </Col> 
        </>
      )}
    </div>
  );
};
export default FilterForm;