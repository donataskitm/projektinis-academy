import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import ZoomImage from './zoomImage';
import ControlForm from './formControl';

function TableRow(props) {
 
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <ZoomImage  src={props.img[0]} alt={props.lt_name} />
      </td>
      <td>{props.lt_name}</td>
      <td>{props.planting_space_from || ''}x{props.planting_space_to || ''}</td>
      <td>
        <ControlForm value={props.cost} id={"cost"} data={props}/>
      </td>
      <td>
        <ControlForm value={props.area} id={"area"} data={props}/>
      </td>
      <td>{props.totalQuantity || ''}</td>
      <td>{props.totalAmount || ''}</td>
      <td>
        <Button
          name={"Trinti"}
          color={"danger"}
          onClick={props.deleteClick} />
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  deleteClick: PropTypes.func.isRequired,
  planting_space_to: PropTypes.string,
  planting_space_from: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  lt_name: PropTypes.string.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  area: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  img: PropTypes.array.isRequired,
};

TableRow.defaultProps = {
  planting_space_to: '',
  planting_space_from: '',
};
    
export default TableRow;


