import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PlantsList from '../../components/PlantsList';
import FilterForm from '../../components/FilterForm';
import {CategoryContext} from '../../contexts/context';
import useLocalStorage from '../../hooks/useLocalStorage';
import {FilterFormHelper} from '../../services/filterFormHelper';

function PlantSearch() {

  const [itemInStorage, saveItemToStorage]=useLocalStorage("input", []);

  const getSelectedValue = (event)=>{
  
    let isFoundItem = itemInStorage.filter((storedItem) => storedItem.category === event.target.id);
    if( isFoundItem == 0){
      FilterFormHelper.addSelectOptInStorage(event, itemInStorage, saveItemToStorage);
    }
    else{
      if(event.target.value === "Pasirinkti..."){
        FilterFormHelper.deleteSelectOptInStorage(event, itemInStorage, saveItemToStorage);
      } else{
        FilterFormHelper.changeSelectOptInStorage(event, itemInStorage, saveItemToStorage);
      }
    }
  };
  const deleteSelection = (category) => {
    FilterFormHelper.deleteSelectOptInStorage(category, itemInStorage, saveItemToStorage);
  };

  const recalculatePagination = () => {
    childRef.setActiveFirstPagination();
  };

  const childRef = {
    recalculatePagination: recalculatePagination
  };

  return (
    <Row className="w-100">
      <Col>
        <Row id="scroll-point">
          <Col md={8} className="min-vw-70">
            <PlantsList selection={itemInStorage} childRef={childRef}/>
          </Col>
          <Col md={4} className="min-vw-30">
            <CategoryContext.Provider
              value={{
                getSelectedValue: getSelectedValue,
                itemInStorage: itemInStorage,
                deleteSelection: deleteSelection,
                recalculatePagination: recalculatePagination
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