import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {CategoryContext} from '../../../contexts/context';
import "./style.css";
import useLocalStorage from '../../../hooks/useLocalStorage';
import {FilterFormHelper} from '../../../services/filterFormHelper';


const Item = (info) => {

  const value = React.useContext(CategoryContext);
  const [, saveItemToStorage] = useLocalStorage("input", []);
  const navigate = useNavigate();

  const addDefaultSrc = (event)=>{
    event.target.src = '/pic/taxonomies.jpg';
  };

  const redirectToCategoryOrPage = () =>{
    if(info.id){
      FilterFormHelper.addSelectionInStorage(info.id, info.taxonomy, saveItemToStorage);
      navigate('/atranka');
    } else{
      value.returnTaxonomy((info.name));
    }
  };

  return (

    <Card key={info}
      onClick={redirectToCategoryOrPage}
      className="text-center m-1 card-style">
      <Card.Body>
        <Card.Text className="fw-bold text-center">
          {info.label ? info.label : info.name}
        </Card.Text>
      </Card.Body>
      <Card.Img className="img-style" 
        variant="bottom" 
        onError={addDefaultSrc}
        src={`/pic/taxonomy/${info.name}.jpg`}/>
    </Card>
  );
};
export default Item;

