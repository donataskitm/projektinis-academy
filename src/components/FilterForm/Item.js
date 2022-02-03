
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/Fetch';
import {CategoryContext} from '../../services/context';
import "./style.css";
import headers from '../../data/fetchAttributes';

const Item = (props) => {
  const constants = {
    'widthListWithBin': 11,
    'widthListNoBin': 12,
    'widthWithBin': 1,
    'widthNoBin': 0
  };

  const { data } = useFetch(process.env.REACT_APP_API_CAT_OF_TAX + props.name+'?per_page=100', headers);

  const value = React.useContext(CategoryContext);
  
  let isFoundItem = (value.savedValue).filter((storedItem) => storedItem.category === props.name);
  const selectedItem = isFoundItem.length > 0;
  const selectValue = selectedItem ? isFoundItem[0].id : "";
  const selectWidth = selectedItem ? constants.widthListWithBin : constants.widthListNoBin ;
  const binWidth = selectedItem ? constants.widthWithBin : constants.widthNoBin ;
  const selectStyle = selectedItem ? 'border border-success border-2' : ""  ;
  const selectImage = selectedItem ? 
    <img
      src="/pic/bin.png"
      className='img-fluid hover-shadow bin-style'
      alt='delete'
      onClick={() =>{value.deleteSelection(isFoundItem[0]);}}
    /> : "";

  return (
    <Row >
      <Col md={selectWidth}>
        <div className="form-floating">
          <select 
            value={selectValue} 
            onChange={event =>{value.getSelectedValue(event);}} 
            className={`form-select h6 ${selectStyle}`}
            id={props.name} >
            <option defaultValue>Pasirinkti...</option>
            {data.map((info, index) => (
              <option key={index} 
                value={info.id} >
                {info.name}
              </option>
            ))
            }
          </select>
          <label className="h6" htmlFor="select">{props.label}</label>
        </div>
      </Col>
      <Col md={binWidth} className="pb-4 g-0 m-auto">
        {selectImage}
      </Col>
    </Row>
  );
};

Item.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default Item;