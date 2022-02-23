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
import  makeList from '../../services/makeList';
import { DataTypeConverter } from '../../services/dataTypeConverter';
import { FIXED_NUMBER_ONE } from '../../config/constants';

const ITEMS_PER_PAGE = 12;

function PlantsList(props) {

  const [itemInStorage, saveItemToStorage] = useLocalStorage("samata", []);

  const [message, setState] = useState({
    text: '', 
    showMessage: false
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentListBox, setListBox] = useState(ITEMS_PER_PAGE);

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
  
  const firstPageIndex = (currentPage - 1) * currentListBox;
  const lastPageIndex =  DataTypeConverter.convertStringToNumber(firstPageIndex, FIXED_NUMBER_ONE) + 
    DataTypeConverter.convertStringToNumber(currentListBox, FIXED_NUMBER_ONE);
  const currentData = data.slice(firstPageIndex,lastPageIndex);

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

  function fillListBox(event) {
    setListBox(event.target.value);
    setCurrentPage(1);
  }

  props.childRef.setActiveFirstPagination = setActiveFirstPagination;

  return (
    <div className="text-center py-5">
      <h4 className="text-center pb-3">Dekoratyviniai žoliniai augalai 
        {!isLoading && ` (${data.length})`}
      </h4>
      {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4>
        <Spinner animation="border" /></div>) : (
        <div >
          {data.length > ITEMS_PER_PAGE &&
          <div className="d-flex align-items-center justify-content-end px-3" >
            <p className="my-auto"> Rodyti: </p>
            <select className="border"
              value={currentListBox} 
              onChange={fillListBox} 
              id={currentListBox}>
              {makeList(ITEMS_PER_PAGE, data.length).map((info, index) => (
                <option key={index} 
                  value={info} >
                  {info}
                </option>
              ))}
            </select>
          </div>
          }
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
              pageSize={DataTypeConverter.convertStringToNumber(currentListBox, FIXED_NUMBER_ONE)}
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