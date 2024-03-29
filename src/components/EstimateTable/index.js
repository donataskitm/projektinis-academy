import React, {useState} from 'react';
import { Table, Modal } from 'react-bootstrap';
import TableRow from './TableRow';
import Button from '../Button';
import useLocalStorage from '../../hooks/useLocalStorage';
import { EstimateCounter } from '../../services/estimateCounter';
import {CategoryContext, HeaderContext} from '../../contexts/context';
import { EstimateStorage } from '../../services/estimateStorage';
import './style.css';
import PropTypes from 'prop-types';

const EstimateTable = React.forwardRef((props, ref) => {
  
  const DELETED_ITEM = 1;
  const [
    itemInStorage, 
    saveItemToStorage, 
    clearItemFromStorage, 
    clearAllItemsFromStorage
  ] = useLocalStorage("samata", []);
  
  const value = React.useContext(HeaderContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const deleteClick = (item) => {
    value.returnItems(itemInStorage.length - DELETED_ITEM);
    clearItemFromStorage(item);
  };

  const getValue = (event, storedValue) => {
    EstimateStorage.addKeyValueToItem(event, storedValue, itemInStorage, saveItemToStorage);
  };

  const clear = () => {
    setShow(true);
  };

  const clearModalButton = () => {
    clearAllItemsFromStorage();
    value.returnItems(0);
  };

  return (

    <div className="mx-3" ref={ref}>
      {
        itemInStorage.length > 0 ?
          <><Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Vardas</th>
                <th>Sodinimo atstumai, cm</th>
                <th>Kaina, eur</th>
                <th>Plotas, kv.m.</th>
                <th>Viso kiekis, vnt.</th>
                <th>Viso suma, eur</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {itemInStorage.map((item, index) => (
                <CategoryContext.Provider key={item.id}
                  value={{
                    getValue: getValue
                  }}>
                  <TableRow {...item}
                    key={item.id}
                    index={index}
                    deleteClick={() => deleteClick(item)} />
                </CategoryContext.Provider>
              ))}
              <tr>
                <td colSpan="5"></td>
                <td>
                  <Button
                    name={"Trinti sąmatą"}
                    color={"danger"}
                    onClick={clear} />
                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Ar tikrai trinti sąmatą?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button name="Trinti" color="danger" onClick={clearModalButton}>
                      </Button>
                      <Button name="Atšaukti" color="success" onClick={handleClose}>
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
                <td>Bendra suma:
                </td>
                <td colSpan="2"> {EstimateCounter.countTotal(itemInStorage) || 0} eur
                </td>
              </tr>
            </tbody>
          </Table>
          <Button
            name={"Saugoti"}
            color={"success"}
            onClick={props.onClick} />
          </>
          :
          <h5 colSpan="4">Sąmata tuščia. Įtraukite augalų</h5>
      }</div>
  );
});

EstimateTable.propTypes = {
  onClick: PropTypes.func
};

EstimateTable.defaultProps = {
  onClick: ()=>{}
};

EstimateTable.displayName = 'EstimateTable';
export default EstimateTable;

