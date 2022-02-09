import React, { useState } from 'react';
import "./style.css";
import Taxonomy from './taxonomy';
import Category from './category';
import {CategoryContext} from '../../contexts/context';

function Plants() {

  const [taxonomy, setTaxonomy] = useState();
  const [isTaxonomy, setTaxonomyState] = useState(true);

  const returnTaxonomy = (taxonomyName) => {

    setTaxonomy(taxonomyName);
    setTaxonomyState(false);
  };

  const returnState = (state) => {
    setTaxonomyState(state);
  };

  return (
    <div className="text-center py-5">
      <div className="d-flex flex-wrap flex-row justify-content-center text-center">
        {isTaxonomy ?
          <CategoryContext.Provider
            value={{
              returnTaxonomy
            }}>
            <Taxonomy />
          </CategoryContext.Provider> :
          <Category taxonomy={taxonomy} returnState={returnState}/>
        }
      </div>
    </div>
  );
}

export default Plants;