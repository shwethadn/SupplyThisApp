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
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ListView,
  Modal,
  TextInput,
} from 'react-native';

// Components
import { Button, Card, Icon,Toolbar } from 'react-native-material-ui/src'
import { Text, Spacer, AppStyles } from '@ui/';
import routes from '../routes';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 20,
  },
  modalButton: {
    marginTop: 10,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  twoButtonView: {
    flexDirection: 'row',
  },
});

var CartItems = [
  {
    id: 72514,
    name: "GODREJ Expert Liquid Hair Dye - Natural Black 1",
    description: "NA", 
    is_active: true,
    company_code: "NA",
    price: 55.0,
    unit_rate: 0.0,
    quantity: "Pack",
    created_by: 545,
    modified_by: 545,
    image_path: null,
    packing_id: 369,
    color_id: 4,
    manufacturer_id: 32892,
    product_type: "Product",
    brand: "",
    tax_on: "Cost",
    banned: false,
    tax_type: "incl of tax",
    is_out_of_stock: false,
    size: "20ML",
    return_days: 7,
    refrigerated_item: false,
    out_of_stock_at: null,
    min_order: 1,
    max_order: null
  },
  {
    id: 72515,
    name: "GODREJ Expert Liquid Hair Dye", 
    description: "NA", 
    is_active: true, 
    company_code: "NA",
    price: 85.0, 
    unit_rate: 0.0, 
    quantity: "Pack", 
    created_by: 545, 
    modified_by: 545, 
    image_path: null, 
    packing_id: 402, 
    color_id: 4, 
    manufacturer_id: 32892, 
    product_type: "Product", 
    brand: "",
    tax_on: "Cost", 
    banned: false, 
    tax_type: "incl of tax", 
    is_out_of_stock: false, 
    size: "40ML", 
    return_days: 7, 
    refrigerated_item: false, 
    out_of_stock_at: null, 
    min_order: 1, 
    max_order: null
  },

  {
    id: 72516, 
    name: "MEGAGLIPTIN TAB", 
    description: "NA", 
    is_active: true, 
    company_code: "636054", 
    price: 70.0, 
    unit_rate: 0.0, 
    quantity: "Strip", 
    created_by: 1311, 
    modified_by: null, 
    image_path: null, 
    packing_id: 237, 
    color_id: 25, 
    manufacturer_id: 206, 
    product_type: "Drug", 
    brand: "", 
    tax_on: "MRP", 
    banned: false, 
    tax_type: "incl of tax", 
    is_out_of_stock: false, 
    size: "", 
    return_days: 7, 
    refrigerated_item: false, 
    out_of_stock_at: null, 
    min_order: 1, 
    max_order: null
  }
];

/* Component ==================================================================== */
class MyCart extends Component {
  static componentName = 'MyCart';

  constructor(props) {
    super(props);
    this.state = { search: "", selected: [] };
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
        onLeftElementPress={() => this.props.navigator.pop()}
        centerElement={this.props.route.title}
        searchable={{
          autoFocus: false,
          placeholder: 'Search',
          onChangeText: value => this.setState({ searchText: value }),
          onSearchClosed: () => this.setState({ searchText: '' }),
        }}
        rightElement={{
          actions: ['person'],
        }}
      />
    );
  }

  renderItmes = () => {
    return CartItems.map(function(prod){
      return(
        <Card key={prod.id}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={{width: 100, height: 100}}>
                <Image
                  source={require('@images/blank_product.jpg')}
                  style={[styles.favourite]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} >
              <View style={{width: 600, height: 100 }}>
                <Spacer/>
                <Text h3>{prod.name}</Text>
                <Text>UOM: {prod.quantity}</Text>
                <Text>Price: Rs. {prod.price}/-({prod.tax_type})</Text>
              </View>
            </TouchableOpacity>
            <View style={{width: 50, height: 100, alignItems: 'flex-end'}}>
              <TouchableOpacity activeOpacity={0.8} >
                <Spacer/>
                <Icon name="delete" size={25} color="red" />
              </TouchableOpacity>
              <Spacer size={60} />
            </View>
          </View>
        </Card>
      );
    });
  }

  render = () => {
    return (
      <View style={[AppStyles.container]}>
        {this.renderToolbar()}
        <ScrollView>
          {this.renderItmes()}
          {this.renderItmes()}
          {this.renderItmes()}
        </ScrollView>
        <Button raised primary
          text={'Continue Shopping'}
          onPress={() => this.props.navigator.push(routes.productList)}
        />
        <Spacer size={10}/>
        <Button raised primary
          text={'CHECKOUT'}
          onPress={() => this.props.navigator.push(routes.orderSummery)}
        />
        <Spacer size={20}/>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default MyCart;
