import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TextInput,
  Image,
  View,
} from 'react-native';

import routes from '../routes';
import { Spacer, AppStyles, Text, Alerts } from '@ui/';
import { Card, Button } from 'react-native-material-ui';

const propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

sign_in_api_url = 'http://192.168.0.113:3000/api/v1/users/sign_in?access_token=';

/* Component ==================================================================== */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: "",
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
    }
  }

  login = () => {
    this.setState({ resultMsg: { status: 'One moment...' } });
    var mainThis = this;
    var myRequest = new Request(sign_in_api_url+access_token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    });

    fetch(myRequest)
    .then((response) => response.json())
    .then(function(responseData) {
      if (responseData.success == true){
        global.user = responseData.user.email;
        global.user_token = responseData.user_token;
        mainThis.setState({
          resultMsg: { success: 'Awesome, you\'re now logged in!' },
        }, () => {
          setTimeout(() => {
            user = 
            mainThis.props.navigator.push(routes.homePage)
          }, 100);
        });
      } else {
        mainThis.setState({ resultMsg: {error: responseData.message } });
      }
    })
    .catch(function(error) {
        console.error(error);
    });
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
        <Alerts
          status={this.state.resultMsg.status}
          success={this.state.resultMsg.success}
          error={this.state.resultMsg.error}
        />

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
              secureTextEntry={true}
              style={{height: 40, width: 400, borderColor: 'gray', borderWidth: 2}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder = "Password"
            />
            <Spacer size={30} />

            <Button raised text={'Login'} primary
              onPress={() => this.login()}
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
