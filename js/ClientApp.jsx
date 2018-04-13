// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App';

const renderApp = () => {
  const htmlElement = document.getElementById('app');
  if (htmlElement) {
    return render(<App />, htmlElement);
  } 
    return <p>404</p>;
  
};
renderApp();
