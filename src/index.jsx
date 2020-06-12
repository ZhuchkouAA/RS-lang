import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/redux-store';

const renderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App state={store.getState().testData.test} />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
};

renderEntireTree();
