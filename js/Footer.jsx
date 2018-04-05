import React from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import ColorPicker from './ColorPicker';
import Timer from './Timer';

const Footer = () => (
  <Paper zDepth={3}>
    <Toolbar>
      <ColorPicker />
      <Timer />
    </Toolbar>
  </Paper>
);

export default Footer;
