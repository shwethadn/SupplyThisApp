import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';
import routes from '../routes';
import { AppStyles } from '@ui/';

const styles = StyleSheet.create({
  imageResize: {
    width: 10,
    height: 40,
  }
});

class FirstPage extends Component {

  renderLoginPage = () => {
    if (user_token != "")
      this.props.navigator.push(routes.homePage)
    else
      this.props.navigator.push(routes.login)
  }
  render() {
    return (
      <View style={[AppStyles.whiteContainer, AppStyles.containerCentered]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.renderLoginPage()}>
            <Image
              source={require('@images/logo_white.png')}
            />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FirstPage;
