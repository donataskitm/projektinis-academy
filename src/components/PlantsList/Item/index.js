import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../Button';
import ImageBin from '../../ImageBin';
import "./style.css";
import PropTypes from 'prop-types';

const Item = (props) => {

  return (
    <Card
      key={props.id}
      className="text-center m-1 card-width">
      <Card.Body>
        <Card.Text>
          {props.lt_name}
        </Card.Text>
        <Card.Text>
          <em className="font-italic">{props.lot_name} </em> {props.author_name}
        </Card.Text>
      </Card.Body>
      <div className="card-img-container">
        <div className="top-right" onClick={props.handler}> 
          <ImageBin width="16px"/>
        </div>
        <Card.Img
          className="card-img"
          variant="bottom"
          src={props.img[0]}
          alt={props.lt_name} />
      </div>

      <Row>
        <Col className="p-2">
          <Button 
            name={"Peržiūrėti"} 
            color={"success"} 
            onClick={props.handleSubmit} />
        </Col>
      </Row>
    </Card>
  );
};


Item.propTypes = {
  id: PropTypes.number.isRequired,
  lt_name: PropTypes.string,
  author_name: PropTypes.string,
  lot_name: PropTypes.string,
  img: PropTypes.array,
  handleSubmit: PropTypes.func,
  handler: PropTypes.func,
};

Item.defaultProps = {
  lt_name: "",
  author_name: "",
  lot_name: "",
  img: [],
  handleSubmit: ()=>{},
  handler: ()=>{},
};


export default Item;