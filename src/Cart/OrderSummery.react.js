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
} from 'react-native';

// Components
import { Card } from 'react-native-material-ui/src'
import { Text, Spacer, AppStyles } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    width: 120,
    height: 80,
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
var total = 0;
/* Component ==================================================================== */
class OrderSummery extends Component {
  static componentName = 'OrderSummery';

  renderItems() {
    return CartItems.map(function(prod){
      return(
        <ScrollView key={prod.id} style={[AppStyles.container]}>
          <Card>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity activeOpacity={0.8} onPress={Actions.productsView}>
                <View style={{width: 150, height: 80, backgroundColor: 'white'}}>
                  <Image
                    source={require('@images/blank_product.jpg')}
                    style={[styles.favourite]}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={Actions.productsView}>
                <View style={{width:450, height: 80, backgroundColor: 'white'}}>
                  <Text h3>{prod.name}</Text>
                  <Text>UOM: {prod.quantity}</Text>
                  <Text>Price: Rs. {prod.price}/-({prod.tax_type})</Text>
                  <Text>Quatity: 2 {prod.quantity}</Text>
                </View>
              </TouchableOpacity>
              <View style={{width: 250, height: 80, backgroundColor: 'white'}}>
                <Text>Total: Rs. {total = total + (prod.price * 2)}/-</Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      );
    });
  }

  render = () => {
    return (
      <View style={[AppStyles.container]}>
        <ScrollView>
          <Spacer size={60} />
          {this.renderItems()}
          {this.renderItems()}
          {this.renderItems()}
        </ScrollView>
        <Card><Text h1>Total: Rs. {total}/-</Text></Card>
        <Card><Text h3>Download PDF</Text></Card>
        <Spacer size={20} />
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default OrderSummery;
