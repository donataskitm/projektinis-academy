import React, {useState } from 'react';
import Item from './Item';
import { useLocation, useNavigate} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/Fetch';
import Pagination from '../Layout/Pagination';
import useLocalStorage from '../../hooks/useLocalStorage';
import PropTypes from 'prop-types';
import { HeaderContext } from '../../contexts/context';
import headers from '../../data/fetchAttributes';
import { Modal } from 'react-bootstrap';
import { makeApiEndpoint } from '../../services/apiEndpointMaker';
import { EstimateStorage } from '../../services/estimateStorage';

const ITEMS_PER_PAGE = 12;

function PlantsList(props) {

  let PageSize = ITEMS_PER_PAGE;

  const [itemInStorage, saveItemToStorage] = useLocalStorage("samata", []);

  const [message, setState] = useState({
    text: '', 
    showMessage: false
  });

  const [currentPage, setCurrentPage] = useState(1);

  let { state } = useLocation();
  const navigate = useNavigate();
  const value = React.useContext(HeaderContext);

  let apiLink;
  if(props.selection.length !== 0){
    apiLink = process.env.REACT_APP_API_FILTER + makeApiEndpoint.formatLinkPart(props.selection);
  } else {
    apiLink = state!==null ? state.apiLink : process.env.REACT_APP_API_ALL_POSTS ;
  }
    
  let { isLoading, data } = useFetch(apiLink, headers);
  
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentData = data.slice(firstPageIndex, lastPageIndex);
  
  const handleClick = (item) => {
    let receivedMessage = EstimateStorage.addValueToItem(item, itemInStorage, saveItemToStorage);
    setState({text: receivedMessage, showMessage: true});
    value.returnItems(itemInStorage.length || 0);
    setTimeout(() => {
      setState({text: receivedMessage, showMessage: false});
    }, 1000);
  };

  function redirectonClick (item) { 
    navigate(`/augalas/${item}`);
  }

  function setActiveFirstPagination () {
    setCurrentPage(1);
  }

  props.childRef.setActiveFirstPagination = setActiveFirstPagination;

  return (
    <div className="text-center py-5">
      <h4 className="text-center pb-3"> Augalų sąrašas</h4>
      {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4>
        <Spinner animation="border" /></div>) : (
        <div >
          <div className="d-flex flex-wrap flex-row justify-content-center text-center">
            {data.length ?
              currentData.map((info, index) => (<Item key={index} {...info} 
                handler={() => handleClick(info)} 
                handleSubmit= {() => redirectonClick(info.id)}/>
              )) :
              <h5> Duomenų nėra. </h5>
            }
          </div>
          <div className="m-4">
            <Pagination
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
          <Modal
            size="sm"
            show={message.showMessage}
            onHide={() => setState({showMessage: false})}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {message.text}
              </Modal.Title>
            </Modal.Header>
          </Modal>
        </div>
      )}
    </div>
  );
}

PlantsList.propTypes = {
  selection: PropTypes.array,
  childRef: PropTypes.object,
  setActiveFirstPagination: PropTypes.func
};

PlantsList.defaultProps = {
  selection: {},
  childRef: {},
  setActiveFirstPagination: ()=>{}
};

export default PlantsList;