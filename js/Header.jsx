import React from 'react';
import AppBar from 'material-ui/AppBar';

const headerStyles = {
  width: '100vw',
  left: 0,
  top: 0,
  position: 'fixed',
  marginBottom: '30px'
};
const Header = () => (
  <div style={headerStyles}>
    <AppBar iconElementLeft={<div />} zDepth={3} title="Home">
      <div>Sign in/Sign up</div>
    </AppBar>
  </div>
);

export default Header;
