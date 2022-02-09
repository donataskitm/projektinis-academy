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
        <Card.Text className="text-center">
          {info.lt_name}
        </Card.Text>
        <Card.Text className="text-center">
          {info.lot_name}  {info.author_name}
        </Card.Text>
      </Card.Body>
      <Card.Img
        className="card-img"
        variant="bottom"
        src={info.img[0]}
        alt={info.lt_name} />
      <Row>
        <Col className="p-2">
          <Button 
            name={"Peržiūrėti"} 
            color={"success"} 
            onClick={info.handleSubmit} />
        </Col>
      </Row>
      <Row>
        <Col className="p-2">
          <Button
            name={"Pridėti"}
            color={"warning"}
            onClick={info.handler}/>
                   
        </Col>
      </Row>
    </Card>
  );
};
export default Item;