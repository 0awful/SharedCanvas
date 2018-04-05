import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

const headerStyles = {
  marginBottom: '30px'
};
const Header = () => (
  <div style={headerStyles}>
    <AppBar
      iconElementLeft={<div />}
      zDepth={3}
      style={{ position: 'fixed' }}
      title="Home">
      <div>Sign in/Sign up</div>
    </AppBar>
    <Toolbar />
  </div>
);

export default Header;
