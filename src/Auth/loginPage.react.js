import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TextInput,
  Image,
  View,
} from 'react-native';

import routes from '../routes';
import { Spacer, AppStyles, Text } from '@ui/';
import { Card, Button } from 'react-native-material-ui';

const propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

/* Component ==================================================================== */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""}
  }

  render = () => {
    return (
      <ScrollView style={[AppStyles.whiteContainer]}>
        <Spacer size={10} />
        <View style={[AppStyles.containerCentered]}>
          <Image source={require('@images/logo.png')}/>
          <Spacer size={70} />
          <Text h1>Login to Continue</Text>
        </View>

        <Spacer size={70} />

        <View style={[AppStyles.containerCentered]}>
          <Card>
            <TextInput
              style={{height: 40, width: 400, borderColor: 'gray', borderWidth: 2}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder = "Email"
            />
            <Spacer size={20} />

            <TextInput
              style={{height: 40, width: 400, borderColor: 'gray', borderWidth: 2}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder = "Password"
            />
            <Spacer size={30} />

            <Button raised text={'Login'} primary
              onPress={() => this.props.navigator.push(routes.homePage)}
            />
            <Spacer size={10} />

            <Text style={[AppStyles.centerAligned]}>
              - or -
            </Text>
            <Spacer size={10} />

            <Button raised text={'Sign Up'} primary
              onPress={() => this.props.navigator.push(routes.productList)}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}

Login.propTypes = propTypes;

/* Export Component ==================================================================== */
export default Login;
