import React from 'react';
import { Row, Col } from 'react-bootstrap';
import List from '../../components/Filter/List';
import Filters from '../../components/FilterForm/Filters';
import {CategoryContext} from '../../contexts/context';
import useLocalStorage from '../../hooks/useLocalStorage';
import  {serviceFilterForm}  from '../../services/serviceFilterForm';

function Filter() {

  const [savedValue, setValue] = useLocalStorage("input", []);

  const getSelectedValue = (event)=>{

    let isFoundItem = savedValue.filter((storedItem) => storedItem.category === event.target.id);
    if( isFoundItem== 0){
      serviceFilterForm.addSelectedValue(event, savedValue, setValue);
    }
    else{
      if(event.target.value ==="Pasirinkti..."){
        serviceFilterForm.deleteSelectedValue(event, savedValue, setValue);
      } else{
        serviceFilterForm.changeSelectedValue(event, savedValue, setValue);
      }
    }
  };
  const deleteSelection = (category) => {
    console.log(category);
    serviceFilterForm.deleteSelectedValue(category, savedValue, setValue);
  };

  return (
    <Row>
      <Col sm={12} className="text-center text-secondary">
        <h4 className="p-5" >Detali dekoratyvinių žolinių augalų atranka </h4>
      </Col>
      <Col>
        <Row className="row gx-0 vw-99">
          <Col md={8} className="min-vw-75">
            <List selection={savedValue}/>
          </Col>
          <Col md={4} className="min-vw-25">
            <CategoryContext.Provider
              value={{
                getSelectedValue: getSelectedValue,
                savedValue: savedValue,
                deleteSelection: deleteSelection
              }}>
              <Filters/>
            </CategoryContext.Provider>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Filter;