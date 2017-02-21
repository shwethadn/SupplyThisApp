/**
 * Authenticate Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import routes from '../routes';

// Components
import { Spacer, AppStyles } from '@ui/';
import { Toolbar, Drawer, Button, Avatar } from 'react-native-material-ui';

const propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    drawcontainer: {
        flex: 1,
        width: 260,
        elevation: 4,
        backgroundColor: 'white',
    },
});

/* Component ==================================================================== */
class HomePage extends Component {
  static componentName = 'HomePage';

  openDrawer(ele){
    console.log("OPEN DRAWER");
    return(
      <View style={styles.drawcontainer}>
        <Drawer>
          <Drawer.Header >
            <Drawer.Header.Account
              avatar={<Avatar text={'A'} />}
              accounts={[
                { avatar: <Avatar text="B" /> },
                { avatar: <Avatar text="C" /> },
              ]}
              footer={{
                dense: true,
                centerElement: {
                  primaryText: 'Reservio',
                  secondaryText: 'business@email.com',
                },
                rightElement: 'arrow-drop-down',
              }}
            />
          </Drawer.Header>
          <Drawer.Section
            divider
            items={[
              { icon: 'bookmark-border', value: 'Notifications' },
              { icon: 'today', value: 'Calendar', active: true },
              { icon: 'people', value: 'Clients' },
            ]}
          />
          <Drawer.Section
            title="Personal"
            items={[
              { icon: 'info', value: 'Info' },
              { icon: 'settings', value: 'Settings' },
            ]}
          />
        </Drawer>
      </View>
    );
  }

  toolBarOptions(icon){
    if (icon.action == 'add-shopping-cart')
      this.props.navigator.push(routes.myCart);
    else if (icon.action == 'person')
      this.props.navigator.push(routes.productList);
  }

  render = () => (
    <View>
      <Toolbar
        leftElement="menu"
        onLeftElementPress={this.openDrawer.bind(this)}
        centerElement="SupplyThis"
        rightElement={{
          actions: ['add-shopping-cart', 'person'],
          menu: { labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 5']},
        }}
        onRightElementPress={this.toolBarOptions.bind(this)}
      />
      <View style={[AppStyles.containerCentered]}>
        <Spacer size={300} />
        <Button raised primary
          text={'DISCOVER'}
          onPress={() => this.props.navigator.push(routes.productList)}
        />
        <Spacer size={30} />

        <Button raised primary
          text={'PLANNER'}
          onPress={() => this.props.navigator.push(routes.productList)}
        />
        <Spacer size={30} />

        <Button raised primary
          text={'PATIENTS'}
          onPress={() => this.props.navigator.push(routes.productList)}
        />
      </View>
    </View>
  );
}
HomePage.propTypes = propTypes;

/* Export Component ==================================================================== */
export default HomePage;
