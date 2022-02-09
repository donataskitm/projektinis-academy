import React, {useState} from 'react';
import { Table, Modal } from 'react-bootstrap';
import TableRow from './TableRow';
import Button from '../Button';
import useLocalStorage from '../../hooks/useLocalStorage';
import { serviceFunctions } from '../../services/serviceFunctions';
import {CategoryContext, HeaderContext} from '../../services/context';

function EstimateTable() {
  const DELETED_ITEM = 1;
  const [savedValue,, clearValue, clearAllValues,, addKeyValue] = useLocalStorage("samata", []);
  
  const value = React.useContext(HeaderContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const deleteClick = (item) => {
    value.returnItems(savedValue.length - DELETED_ITEM);
    clearValue(item);
  };

  const getValue = (event, storedValue) => {
    addKeyValue(event, storedValue);
  };

  const clear = () => {
    setShow(true);
  };

  const clearModalButton = () => {
    clearAllValues();
    value.returnItems(0);
  };

  return (

    <div>
      {
        savedValue.length > 0 ?
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Pavadinimas</th>
                <th>Sodinimo atstumai, cm</th>
                <th>Kaina, eur</th>
                <th>Plotas, kv.m.</th>
                <th>Viso kiekis, vnt.</th>
                <th>Viso suma, eur</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {savedValue.map((item, index) => (
                <CategoryContext.Provider  key={item.id}
                  value={{
                    getValue: getValue
                  }}>
                  <TableRow {...item}
                    key={item.id}
                    index={index}
                    deleteClick={() => deleteClick(item)}
                  />
                </CategoryContext.Provider>
              ))
              }
              <tr>
                <td colSpan="3"></td>
                <td>
                </td>
                <td><Button
                  name={"Saugoti"}
                  color={"success"} />
                </td>
                <td><Button
                  name={"Trinti sąmatą"}
                  color={"danger"}
                  onClick= {clear}/>
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
                <td colSpan="2"> {serviceFunctions.countTotal(savedValue) || 0} eur
                </td>
              </tr>
            </tbody>
          </Table>
          :
          <h5 colSpan="4">Sąmata tuščia. Įtraukite augalų</h5>
      }</div>
  );
}

export default EstimateTable;

