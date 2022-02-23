import React from 'react';
import Home from '../pages/Home';
import PlantSearch from '../pages/PlantSearch';
import Estimate from '../pages/Estimate';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Contacts from '../pages/Contacts';
import Help from '../pages/Help';
import About from '../pages/About';
import Plant from '../pages/Plant';
import Footer from '../components/Layout/Footer';
import { ROUTES } from '.';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import SignIn from '../components/Authentication/SignIn';
import SignOut from '../components/Authentication/SignOut';
import NotFound from '../pages/NotFound';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

const StyledDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
min-height: 71vh;
margin: 0;
`;

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <StyledDiv>
          <Routes>
            <Route path={ROUTES.DEFAULT} element={<Home />} />
            <Route path={ROUTES.PLANTSEARCH} element={<PlantSearch />} />
            <Route path={ROUTES.ESTIMATE} element={<Estimate />} />
            <Route path={ROUTES.REGISTER} element={<SignOut><Register /></SignOut>} />
            <Route path={ROUTES.LOGIN} element={<SignOut><Login /></SignOut>} />
            <Route path={ROUTES.CONTACTS} element={<Contacts />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.HELP} element={<Help />} />
            <Route path={ROUTES.PLANT} element={<Plant />} />
            <Route path={ROUTES.DASHBOARD} element={<SignIn><Dashboard /></SignIn>} />
            <Route path={ROUTES.NOTFOUND} exact={true}   element={<NotFound />}/>
          </Routes>
        </StyledDiv>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default Router;

