import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';
import routes from '../routes';
import { AppStyles } from '@ui/';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const styles = StyleSheet.create({
  imageResize: {
    width: 10,
    height: 40,
  }
});

class FirstPage extends Component {
  render() {
    return (
      <View style={[AppStyles.whiteContainer, AppStyles.containerCentered]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigator.push(routes.login)}>
            <Image
              source={require('@images/logo_white.png')}
            />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FirstPage;
