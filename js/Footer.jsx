import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import ColorPicker from './ColorPicker';
import Timer from './Timer';
import Tools from './Tools';

// rgb(0,188,212)
// #F0F0FF
const footerStyle = {
  width: '100vw',
  backgroundColor: 'rgb(0,188,212)',
  left: 0,
  bottom: 0,
  position: 'fixed'
};

const Footer = () => (
  <Toolbar style={footerStyle}>
    <ToolbarGroup>
      <ColorPicker />
      <Tools />
    </ToolbarGroup>
    <Timer />
  </Toolbar>
);

export default Footer;
