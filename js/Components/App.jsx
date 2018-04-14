import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import store from '../store';
import Canvas from './Canvas';
import Header from './Header';
import Footer from './Footer';
import { subscribeToTimer, updateTimer } from '../SocketsIndex';

class App extends Component {
  constructor() {
    super();
    subscribeToTimer(15, (err, value) => {
      updateTimer(value);
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Provider store={store}>
          <div className="App">
            <Header />
            <Canvas />

            <Footer />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
