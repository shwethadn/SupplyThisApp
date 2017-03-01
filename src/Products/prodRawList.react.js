import React, { Component, PropTypes } from 'react';
import { ToastAndroid, ScrollView, View, Platform, Animated,
  Easing, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-simple-modal';

import routes from '../routes';
import ProductDetails from './ProductDetails.react';
import Drawer from 'react-native-drawer';
import DrawerSpec from '../Drawer';

import { Spacer, Text, AppStyles } from '@ui/';
// components
import {
  Toolbar,
  Icon,
  Card,
  Button,
  Badge,
} from 'react-native-material-ui/src';

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

class ProductListView extends Component {
  constructor(props) {
    super(props);

    this.offset = 0;
    this.scrollDirection = 0;

    this.state = {
      open: false,
      prod: {},
      products: [],
      selected: [],
      searchText: '',
      qty: '',
      moveAnimated: new Animated.Value(0),
    };
  }

  toolBarOptions(icon){
    if (icon.action == 'add-shopping-cart')
      this.props.navigator.push(routes.myCart);
    else if (icon.action == 'home')
      this.props.navigator.pop();
  }

  handleSearchChanges(){
    var search = this.state.searchText;
    var myRequest = new Request(api_url+"products/search?access_token="+access_token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        user_id: 852,
        search_text: search,
      })
    });

    fetch(myRequest)
    .then((response) => response.json())
    .then(function(responseData) {
      productsList = responseData;
    })
    .catch(function(error) {
        console.error(error);
    });
   }

  componentWillMount(){
    var this_val = this;
    var myRequest = new Request(api_url+"products/search?access_token="+access_token, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        user_id: 852,
      })
    });

    fetch(myRequest)
    .then((response) => response.json())
    .then(function(responseData) {
      this_val.setState({products: responseData});
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  show = () => {
    Animated.timing(this.state.moveAnimated, {
      toValue: 0,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  }
  hide = () => {
    Animated.timing(this.state.moveAnimated, {
      toValue: 56, // because the bottom navigation bar has height set to 56
      duration: 195,
      easing: Easing.bezier(0.4, 0.0, 0.6, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  }
  renderToolbar = () => {
    if (this.state.selected.length > 0) {
      return (
        <Toolbar
          key="toolbar"
          leftElement="clear"
          onLeftElementPress={() => this.setState({ selected: [] })}
          centerElement={this.state.selected.length.toString()}
          rightElement={['delete']}
          style={{
            container: { backgroundColor: 'white' },
            titleText: { color: 'rgba(0,0,0,.87)' },
            leftElement: { color: 'rgba(0,0,0,.54)' },
            rightElement: { color: 'rgba(0,0,0,.54)' },
          }}
        />
      );
    }
    return (
      <Toolbar
        key="toolbar"
        leftElement="menu"
        onLeftElementPress={this.props.openDrawer}
        centerElement={"Products List"}
        searchable={{
          autoFocus: false,
          placeholder: 'Search',
          onChangeText: value => this.setState({ searchText: value }),
          onSearchClosed: value => this.setState({ searchText: '' }),
        }}
        rightElement={{
          actions: ['home', 'add-shopping-cart'],
        }}
        onRightElementPress={this.toolBarOptions.bind(this)}
      />
    );
  }

  addToCart = () => {
    var this_val = this;
    var myRequest = new Request(api_url+"cart/cartitem?access_token="+access_token, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        user_token: user_token,
        product_id: this_val.state.prod.id,
        quantity: this_val.state.qty,
      })
    });

    fetch(myRequest)
    .then((response) => response.json())
    .then(function(responseData) {
      console.log("adding product to cart respose");
      console.log(responseData);
      this_val.setState({open: false});
    })
    .catch(function(error) {
      console.error(error);
    });
    // this.props.navigator.push(routes.myCart);
  }

  pushProdDetails = (p_id) => {
    routes.productDetails.props.prod_id = p_id;
    this.props.navigator.push(routes.productDetails);
  }

  onChanged = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
        newText = newText + text[i];
      }
      else {
        alert("please enter numbers only");
      }
      this.setState({ qty: newText });
    }
  }

  renderModal = () => {
    return(
      <Modal
         offset={this.state.offset}
         open={this.state.open}
         modalDidOpen={() => console.log('modal did open')}
         modalDidClose={() => this.setState({open: false})}
         style={{alignItems: 'center'}}>
         <View>
            <Text h3>Add to Cart</Text>
            <Text h4>product Name: {this.state.prod.name}</Text>
            <Text>product id: {this.state.prod.id}</Text>
            <TextInput 
              style={styles.textInput}
              keyboardType = 'numeric'
              onChangeText = {(qty)=> this.onChanged(qty)}
              value = {this.state.qty}
              maxLength = {8}
              placeholder = "Quantity"
            />
            <Spacer />
            <Button raised accent text="Add to Cart"
              onPress={() => this.addToCart()}
            />
         </View>
      </Modal>
    );
  }

  renderList = () => {
    var prodListThis = this;
    if(prodListThis.state.searchText.length > 0) 
      prodListThis.handleSearchChanges();
    else
      productsList = this.state.products;
    if (productsList["products"] != undefined){
      return productsList["products"].map(function(prod){
        return(
          <TouchableOpacity key={prod.id} activeOpacity={0.8} onPress={() => prodListThis.pushProdDetails(prod.id)}>
            <Card>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{paddingLeft: 20, width: 125, height: 200, backgroundColor: 'white'}}>
                  <Spacer size={20}/>
                  <Badge text="save 20%" size={35} redColor 
                    style={{ container: { top: -15, left: -12 } }}>
                    <Image style={[styles.imageResize]}
                      source={require('@images/blank_product.jpg')}
                    />
                  </Badge>
                </View>
                <View style={{width: 600, height: 200, backgroundColor: 'white'}}>
                  <Spacer/>
                  <Text h3>{prod.name}</Text>
                  <Text>Company: {prod.brand}</Text>
                  <Text>Packing: {prod.quantity}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Price: Rs.</Text><Text>{prod.price}</Text><Text>/-({prod.tax_type})</Text>
                  </View>
                  <Spacer size={20}/>
                  <Button raised accent text="Add to Cart"
                    onPress={() => prodListThis.setState({open: true, prod: prod, qty: prod.min_order+''})}
                  />
                </View>
              </View>
            </Card>
            <Spacer />
          </TouchableOpacity>
        );
      });
    } else {
      <Text h3> No Products found </Text>
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "#E9EBEF"}}>
        {this.renderToolbar()}
        <View style={{flexDirection: 'row' }}>
          <View style={[styles.filterView]}>
            <Button text="FILTER" icon="filter-list" />
          </View>
          <View style={[styles.filterView]}>
            <Button text="RANGE" icon="compare-arrows" />
          </View>
          <View style={[styles.filterView]}>
            <Button text="SORT" icon="sort" />
          </View>
        </View>
        <ScrollView
          keyboardDismissMode="interactive">
          {this.renderList()}
        </ScrollView>
        {this.renderModal()}
      </View>
    );
  }
}
export default ProductListView;
