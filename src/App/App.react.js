import React, { Component } from 'react';
import { Navigator, NativeModules, StatusBar } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import routes from '../routes';
import Container from '../Container';

const UIManager = NativeModules.UIManager;

const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500,
    accentColor: COLOR.green500,
  },
};

class App extends Component {
  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }
  static renderScene(route, navigator) {
    return (
      <Container>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <route.Page
          route={route}
          navigator={navigator}
        />
      </Container>
    );
  }
  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Navigator
          configureScene={App.configureScene}
          initialRoute={routes.firstPage}
          ref={this.onNavigatorRef}
          renderScene={App.renderScene}
        />
      </ThemeProvider>
    );
  }
}

export default App;
