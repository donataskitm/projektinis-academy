import React, { useState } from 'react';
import Item from '../Item';
import { useLocation, useNavigate} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useFetch from '../../../hooks/Fetch';
import Pagination from '../../Layout/Pagination';
import * as constants from '../../../config/constants';
import useLocalStorage from '../../../hooks/useLocalStorage';
import PropTypes from 'prop-types';
import { HeaderContext } from '../../../contexts/context';
import headers from '../../../data/fetchAttributes';
import { Modal } from 'react-bootstrap';
import { makeApiEndpoint } from '../../../services/makeApiEndpoint';

function Plants(props) {

  const [storedValue, , , , addValue] = useLocalStorage("samata", []);

  const [message, setState] = useState({
    text: '', 
    showMessage: false
  });

  const [currentPage, setCurrentPage] = useState(constants.CURRENT_PAGE);
  const [postsPerPage] = useState(constants.POST_PER_PAGE);

  let { state } = useLocation();
  const navigate = useNavigate();
  const value = React.useContext(HeaderContext);

  let apiLink;
  if(props.selection.length !== 0){
    apiLink = process.env.REACT_APP_API_FILTER + makeApiEndpoint.formatLinkPart(props.selection);
  } else {
    apiLink = state!==null ? state.apiLink : process.env.REACT_APP_API_ALL_POSTS ;
  }
    
  let { isLoading, data } = useFetch(apiLink, headers);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (item) => {
    let receivedMessage = addValue(item);
    setState({text: receivedMessage, showMessage: true});
    value.returnItems(storedValue.length || 0);
    setTimeout(() => {
      setState({text: receivedMessage, showMessage: false});
    }, 1000);
  };

  function redirectonClick (item) { 
    navigate(`/augalas/${item}`);
  }
  return (
    <div className="text-center py-5">
      <h4 className="text-center pb-3"> Augalų sąrašas</h4>
      {isLoading ? (<div className="text-center mx-auto"><h4>Kraunama...</h4>
        <Spinner animation="border" /></div>) : (
        <div >
          <div className="d-flex flex-wrap flex-row justify-content-center text-center">
            {data.length ?
              currentPosts.map((info, index) => (<Item key={index} {...info} 
                handler={() => handleClick(info)} 
                handleSubmit= {() => redirectonClick(info.id)}/>
              )) 
              :
              <h5> Duomenų nėra. </h5>
            }
          </div>
          <div className="m-4">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data.length}
              paginate={paginate} />
          </div>
          <Modal
            size="sm"
            show={message.showMessage}
            onHide={() => setState({showMessage: false})}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {message.text}
              </Modal.Title>
            </Modal.Header>
          </Modal>
        </div>
      )}
    </div>
  );
}

Plants.propTypes = {
  selection: PropTypes.array,
};

Plants.defaultProps = {
  selection: {},
};

export default Plants;