import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BootsrapModal} from 'react-bootstrap';


function Modal(props) {
  
  return (
    <BootsrapModal
      size="sm"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="example-modal-sizes-title-sm">
      <BootsrapModal.Header closeButton>
        <BootsrapModal.Title id="example-modal-sizes-title-sm">
          {props.message}
        </BootsrapModal.Title>
      </BootsrapModal.Header>
      <BootsrapModal.Body>{props.comment}</BootsrapModal.Body>
    </BootsrapModal>
  );
}

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  onHide: PropTypes.func
},
Modal.defaultProps = {
  onHide: ()=>{}
};
export default Modal;