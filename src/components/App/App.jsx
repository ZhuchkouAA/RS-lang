import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../redux/redux-store';
import Header from '../Header';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import AppWithRoutes from './AppWithRouter';
import Autorization from './Autorization';

const { token } = store.getState().userData;
const PageRoutes = token ? AppWithRoutes : Autorization;
const App = () => (
  <>
    <Provider store={store}>
      <Header />
      <NavBar />
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
      <Footer />
    </Provider>
  </>
);

export default App;
