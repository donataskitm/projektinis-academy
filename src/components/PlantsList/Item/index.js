import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../Button';
import "./style.css";

const Item = (info) => {

  return (
    <Card
      key={info.id}
      className="text-center m-1 card-width">
      <Card.Body>
        <Card.Text>
          {info.lt_name}
        </Card.Text>
        <Card.Text>
          <em className="font-italic">{info.lot_name} </em> {info.author_name}
        </Card.Text>
      </Card.Body>
      <div className="card-img-container" onClick={info.handler}>
        <div className="top-right"> 
          <img
            src="/pic/estimate.png"
            className='img-fluid hover-shadow'
            alt='samata'
            width="16px"/>
        </div>
        <Card.Img
          className="card-img"
          variant="bottom"
          src={info.img[0]}
          alt={info.lt_name} />
      </div>

      <Row>
        <Col className="p-2">
          <Button 
            name={"Peržiūrėti"} 
            color={"success"} 
            onClick={info.handleSubmit} />
        </Col>
      </Row>
    </Card>
  );
};
export default Item;