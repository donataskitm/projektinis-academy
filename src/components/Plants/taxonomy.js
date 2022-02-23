import React, {useState} from 'react';
import Item from './Item';
import { Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/Fetch';
import "./style.css";
import headers from '../../data/fetchAttributes';
import Button from '../Button';

function Taxonomy() {

  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_TAXONOMIES_URL, headers);

  const itemsPerPage = 8;
  const [page, setPage] = useState(itemsPerPage);
  const totalPages = data.slice(0, page);

  const showItems = () => {
    setPage(page + itemsPerPage);
  };

  return (
    <div className="text-center py-1">
      <h4 className="text-center pb-3"> Pasirink kategoriją želdynui kurti</h4>
      
      {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4><Spinner animation="border" /></div>) : (
        <div >
          <div className="d-flex flex-wrap flex-row justify-content-center text-center">
            {totalPages.map((info, index) => (<Item key={index} {...info}  />
            ))
            }
          </div>
        </div>
      )}
      <div className="justify-content-center">
          
        {page < data.length && 
        <Button name={isLoading ? 'Kraunama...' : 'Rodyti daugiau kategorijų'} 
          color="success" 
          onClick={showItems}/>
        }
      </div>
    </div>
  );
}

export default Taxonomy;