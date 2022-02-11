import React from 'react';
import Button from '../../components/Button';
import { Spinner, Row, Col } from 'react-bootstrap';
import useFetch from '../../hooks/Fetch';
import { useParams, useNavigate } from "react-router-dom";
import TaxonomyName from '../../components/Plants/taxonomyName';
import headers from '../../data/fetchAttributes';
import { DataTypeChecker } from '../../services/dataTypeChecker';

function Plant() {

  const { id } = useParams();
  const navigation = useNavigate();
  
  const { isLoading, data } = useFetch(process.env.REACT_APP_API_POST + id, headers);


  const back = ()=>{
    navigation('/atranka');
  };

  return (
    <Row>
      <div className="text-center py-5">
        <h4 className="text-center pb-3"> Papildoma augalo informacija</h4>
        {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4>
          <Spinner animation="border" /></div>) : (
          <div >
            <div className="d-flex flex-wrap flex-row justify-content-center text-center">
              {data.map((info) => (
                <div key="info.id">
                  <Row  className="justify-content-md-center">
                    <Col className="w-50">
                      <img
                        src={info.img}
                        className='img-thumbnail'
                        alt='...'
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col  className="text-center pt-5" >
                      <h4>{info.lt_name} ({info.lot_name} {info.author_name})</h4>
                      <h4 className="font-italic"></h4>
                    </Col> 
                  </Row>
                  <Row>
                    {Object.entries(info).map(([key, value]) => (
                      DataTypeChecker.is_array(value) &&
                        (
                          <Row key={key}>
                            <Col xs={12} className="text-center">
                              <h5><TaxonomyName name={key}/></h5>
                            </Col>
                            {(value).map((category) => (
                              <Col xs={12} key={category.term_id}>
                                {category.name}
                              </Col>
                            ))}
                          </Row>
                        )
                    ))}
                  </Row>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="py-5">
          <Button name={"Atgal"} color={"success"} onClick={back}></Button>
        </div>
      </div>
    </Row>
  );
}

export default Plant;