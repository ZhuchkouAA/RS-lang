import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';

const renderEntireTree = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderEntireTree();
