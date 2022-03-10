/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import Item from './Item';
import { useLocation, useNavigate} from 'react-router-dom';
import { Spinner, Col, Row } from 'react-bootstrap';
import useFetch from '../../hooks/Fetch';
import Pagination from '../Layout/Pagination';
import useLocalStorage from '../../hooks/useLocalStorage';
import PropTypes from 'prop-types';
import { HeaderContext } from '../../contexts/context';
import headers from '../../data/fetchAttributes';
import { Modal} from 'react-bootstrap';
import { makeApiEndpoint } from '../../services/apiEndpointMaker';
import { EstimateStorage } from '../../services/estimateStorage';
import  makeItemsPerPageList from '../../services/makeList';
import { DataTypeConverter } from '../../services/dataTypeConverter';
import { FIXED_NUMBER_ONE } from '../../config/constants';
import sortList from '../../data/listBoxSort';
import sortItems from '../../services/sortItems';
import "./style.css";

const ITEMS_PER_PAGE = 12;

function PlantsList(props) {

  const [itemInStorage, saveItemToStorage] = useLocalStorage("samata", []);
  const [message, setState] = useState({
    text: '', 
    showMessage: false
  });

  let { state } = useLocation();

  const [currentPage, setCurrentPage] = useState(state && state.currentPage  || 1);
  const [currentListBox, setListBox] = useState(state && state.currentListBox || ITEMS_PER_PAGE);
  const [currentSortList, setSortList] = useState(state && state.currentSortList || 0);

  const navigate = useNavigate();
  const value = React.useContext(HeaderContext);
  let apiLink;
  
  if(props.selection.length !== 0){
    apiLink = process.env.REACT_APP_API_FILTER + makeApiEndpoint.formatLinkPart(props.selection);
  } else {
    apiLink = state!==null ? state.apiLink : process.env.REACT_APP_API_ALL_POSTS;
  }

  let { isLoading, data } = useFetch(apiLink, headers);
 
  useEffect(() => {
    sortItems(currentSortList, data);
    if (state && state.currentPage){
      navigate(-2);
    }
  }, [data]);
  
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
    const statesSendToPage = {
      apiLink: apiLink, 
      currentListBox: currentListBox, 
      currentPage: currentPage, 
      currentSortList: currentSortList,
    };
    navigate(`/augalas/${item}`, { state: statesSendToPage });
  }

  function redirectOnDelete () {
    setCurrentPage(1);
    navigate("/atranka", { state: {apiLink: process.env.REACT_APP_API_ALL_POSTS } });
  }
  
  function setActiveFirstPagination () {
    setCurrentPage(1);
    setListBox(ITEMS_PER_PAGE);
  }
  
  function fillListBox(event) {
    setListBox(event.target.value);
    setCurrentPage(1);
  }

  function sortItemsList(event){
    setSortList(event.target.value);
    sortItems(event.target.value, data);
  }

  props.childRef.setActiveFirstPagination = setActiveFirstPagination;
  const itemsPerPage = makeItemsPerPageList(ITEMS_PER_PAGE, data.length);
  return (
    <Row className="text-center py-5 gx-0">
      <h4 className="text-center pb-3">Dekoratyviniai žoliniai augalai 
        {!isLoading && ` (${data.length})`}
      </h4>
      {!isLoading && props.selection.length == 0 && state && state.searchKey!==undefined &&
      <>
        <Col md={12} className="text-center pb-3">
          <p className="text-center">Paieškos frazė <b><em>{state && state.searchKey}</em></b></p>
          <div>
            <img
              src="/pic/bin.png"
              alt='delete'
              width={35}
              className="img-fluid bin-style1"
              onClick={redirectOnDelete}/>
          </div>
        </Col>
      </>
      }
      {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4>
        <Spinner animation="border" /></div>) : (
        <Col>
          {data.length > ITEMS_PER_PAGE &&
         <Row className="d-flex justify-content-between m-2 p-2 border rounded">
           {/* TODO: make listbox component */}
           <Col className="d-flex align-items-center px-3" >
             <p className="my-auto"> Rikiuoti: </p>
             <select className="border"
               value={currentSortList} 
               onChange={sortItemsList} 
               id={currentSortList} >
               {sortList.map((inf, index) => (
                 <option key={index} 
                   value={index} >
                   {inf.name}
                 </option>
               ))}
             </select>
           </Col>
           <Col className="d-flex align-items-center justify-content-end px-3" >
             <p className="my-auto"> Rodyti: </p>
             <select className="border"
               value={currentListBox} 
               onChange={fillListBox} 
               id="fillListBox">
               {itemsPerPage.map((info, index) => (
                 <option key={index} 
                   value={info} >
                   {info}
                 </option>
               ))}
             </select>
           </Col>
         </Row>
          }
          <div className="d-flex flex-wrap flex-row justify-content-center text-center">
            {data.length ?
              currentData.map((info, index) => (<Item key={index} {...info} 
                handler={() => handleClick(info)} 
                handleSubmit = {() => redirectonClick(info.id)}/>
              )) : <h5> Duomenų nėra. </h5>
            }
          </div>
          <div className="m-4">
            <Pagination
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={DataTypeConverter.convertStringToNumber(currentListBox, FIXED_NUMBER_ONE)}
              onPageChange={page => setCurrentPage(page)}/>
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
        </Col>
      )}
    </Row>
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