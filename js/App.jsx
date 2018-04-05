import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Canvas from './Canvas';
import Header from './Header';
import Footer from './Footer';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div className="App">
      <Header />
      <Canvas />

      <Footer />
    </div>
  </MuiThemeProvider>
);

export default App;
