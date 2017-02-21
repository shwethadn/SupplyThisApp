import { View, TouchableOpacity, Image } from 'react-native';
import React, { Component, PropTypes } from 'react';
import routes from '../routes';
import { AppStyles } from '@ui/';

class FirstPage extends Component {
  render() {
    return (
      <View style={[AppStyles.grayContainer, AppStyles.containerCentered]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigator.push(routes.login)}>
            <Image
              source={require('@images/logo.png')}
            />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FirstPage;
