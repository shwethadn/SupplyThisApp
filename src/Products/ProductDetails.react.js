/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import routes from '../routes';

// Components
import { Spacer, Text, AppStyles } from '@ui/';

import {
  Icon,
  Card,
  Button,
  Toolbar,
} from 'react-native-material-ui/src';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  twoButtonView: {
    flexDirection: 'row',
  },
  favourite: {
    width: 200,
    height: 200,
  },
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor:'green',
    flexDirection:'row',
    height:80,
    alignItems:'center',
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  footerText: {
    color:'white',
    fontWeight:'bold',
    alignItems:'center',
    fontSize:30,
  },
});
var product = "";

/* Component ==================================================================== */
class ProductDetails extends Component {
  static componentName = 'ProductDetails';

  constructor(props) {
    super(props);
    this.state = { searchText: '', prod: ""}
  }

  componentWillMount(){
    curThis = this;
    var p_id = this.props.route.props.prod_id;
    fetch("http://192.168.0.113:3000/api/v1/products/"+p_id, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      curThis.setState({ prod: responseData });
    }).done();
  }

  relatedImages(){
    return(
      <View style={{width: 180, height: 180, backgroundColor: 'white'}}>
        <Image
          source={require('@images/logo.png')}
        />
      </View>
    );
  }

  render = () => {
    product = this.state.prod;
    return (
      <View style={[AppStyles.whiteContainer]}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigator.pop()}
          centerElement={this.props.route.title}
          searchable={{
            autoFocus: false,
            placeholder: 'Search',
            onChangeText: value => this.setState({ searchText: value }),
            onSearchClosed: () => this.setState({ searchText: '' }),
          }}
          rightElement="list"
          onRightElementPress={() => this.props.navigator.pop()}
        />
        <ScrollView>
          <Spacer size={20} />
          <Text h2>{product.name}</Text>
          <Text>Brand: {product.brand}</Text>
          <Spacer size={20} />
          <View style={{marginLeft: 300}}>
            <Image
              source={require('@images/blank_product.jpg')}
              style={[styles.favourite]}
            />
          </View>
          <Spacer size={30} />
          <ScrollView horizontal>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
            </View>
          </ScrollView>
          <View style={[AppStyles.hr]} />
          <Spacer size={20} />

          <View style={{marginLeft: 10, marginRight: 5}}>
            <Text>Description: {product.description}</Text>
            <Text>Product Code: {product.company_code}</Text>
            <Text>Packaging: {product.quantity}</Text>
            <Text>Size: {product.size}</Text>
            <Text>MRP: {product.quantity}</Text>
            <Text h3>Price: {product.price}/-{product.tax_type}</Text>
          </View>
          <Spacer size={10} />
          <Spacer size={20} />
          <View style={[AppStyles.hr]} />
          <Text h1>Related Images</Text>
          <Spacer size={20} />
          <ScrollView horizontal>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
              {this.relatedImages()}
            </View>
          </ScrollView>
          <View style={[AppStyles.hr]} />
          <Spacer size={20} />
        </ScrollView>
        <View style={styles.mainviewStyle}>
          <View style={styles.footer}>
            <View style={styles.bottomButtons}>
              <Text style={[styles.footerText]}>Rs. {product.price}/-</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => this.props.navigator.push(routes.myCart)}
              style={styles.bottomButtons}>
              <Text style={[styles.footerText]}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Spacer size={5} />
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default ProductDetails;
