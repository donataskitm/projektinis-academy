import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PlantsList from '../../components/PlantsList';
import FilterForm from '../../components/FilterForm';
import {CategoryContext} from '../../contexts/context';
import useLocalStorage from '../../hooks/useLocalStorage';
import {FilterFormHelper} from '../../services/filterFormHelper';
import { useNavigate } from 'react-router-dom';

function PlantSearch() {

  const [itemInStorage, saveItemToStorage]=useLocalStorage("input", []);
  const navigate = useNavigate();
  const getSelectedValue = (event)=>{
  
    let isFoundItem = itemInStorage.filter((storedItem) => storedItem.category === event.target.id);
    if( isFoundItem == 0){
      FilterFormHelper.addSelectOptInStorage(event, itemInStorage, saveItemToStorage);
    }
    else{
      if(event.target.value === "Pasirinkti..."){
        FilterFormHelper.deleteSelectOptInStorage(event, itemInStorage, saveItemToStorage);
        redirectIfNotSelected();
      } else{
        FilterFormHelper.changeSelectOptInStorage(event, itemInStorage, saveItemToStorage);
      }
    }
  };
  const deleteSelection = (category) => {
    FilterFormHelper.deleteSelectOptInStorage(category, itemInStorage, saveItemToStorage);
    redirectIfNotSelected();
  };

  const deleteAllSelections = () => {
    saveItemToStorage([]);
  };

  const recalculatePagination = () => {
    childRef.setActiveFirstPagination();
  };

  const childRef = {
    recalculatePagination: recalculatePagination
  };

  const redirectIfNotSelected = () => {
    if(itemInStorage.length<2) {
      const apiLink = process.env.REACT_APP_API_ALL_POSTS;
      navigate("/atranka", { state: {apiLink: apiLink } });
    }
  };

  return (
    <Row className="w-100">
      <Col>
        <Row id="scroll-point">
          <Col md={8} className="min-vw-70">
            <PlantsList selection={ itemInStorage } childRef={childRef}/>
          </Col>
          <Col md={4} className="min-vw-30">
            <CategoryContext.Provider
              value={{
                getSelectedValue: getSelectedValue,
                itemInStorage:  itemInStorage ,
                deleteSelection: deleteSelection,
                recalculatePagination: recalculatePagination,
                deleteAllSelections: deleteAllSelections
              }}>
              <FilterForm/>
            </CategoryContext.Provider>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default PlantSearch;