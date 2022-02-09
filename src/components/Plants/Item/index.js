import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {CategoryContext} from '../../../contexts/context';
import "./style.css";
import useLocalStorage from '../../../hooks/useLocalStorage';

const Item = (info) => {

  const value = React.useContext(CategoryContext);
  const [, setValue] = useLocalStorage("input", []);
  const navigate = useNavigate();

  const apiLink = process.env.REACT_APP_API_POST_CATAX + info.id + '?cat=' + info.taxonomy;

  const addDefaultSrc = (event)=>{
    event.target.src = '/pic/taxonomies.jpg';
  };

  return (

    <Card key={info}
      onClick={() => 
      {if(info.id){
        setValue([]);
        navigate('/atranka', {state: {apiLink: apiLink}});
      } else{
        value.returnTaxonomy((info.name));
      }}
      }
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

