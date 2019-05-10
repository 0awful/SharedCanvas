// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './ComponentsIndex';

export default () => {
  const htmlElement = document.getElementById('app');
  if (htmlElement) {
    return render(<App />, htmlElement);
  }
  return <p>404</p>;
};