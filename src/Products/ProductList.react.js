import React, { Component, PropTypes } from 'react';
import { ToastAndroid, ScrollView, View, Platform, Animated,
  Easing, StyleSheet, Image, TouchableOpacity } from 'react-native';

import routes from '../routes';
import ProductDetails from './ProductDetails.react';
import Drawer from 'react-native-drawer';
import DrawerSpec from '../Drawer';
import ProductListView from './prodRawList.react';

import { Spacer, Text, AppStyles } from '@ui/';
// components
import {
  Toolbar,
  Icon,
  Card,
  Button,
  Badge,
} from 'react-native-material-ui/src';

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

const styles = StyleSheet.create({
  imageResize: {
    width: 90,
    height: 100,
  },
  filterView: {
    width: 265,
    height: 50,
    backgroundColor: 'white',
    paddingTop: 10,
  }
});

const propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

class ProductList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:100,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .50,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: true,
      acceptPan: true,
      tapToClose: false,
      negotiatePan: false,
      rightSide: false,
    };
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  openDrawer(){
    this.drawer.open()
  }

  render() {
    var controlPanel = <DrawerSpec closeDrawer={() => {
      this.drawer.close();
    }} />
    return (
      <Drawer
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.rightSide ? 'right' : 'left'}
        >
        <ProductListView
          drawerType={this.state.drawerType}
          openDrawer={this.openDrawer.bind(this)}
          navigator={this.props.navigator}
          />
      </Drawer>
    );
  }
}

export default ProductList;
