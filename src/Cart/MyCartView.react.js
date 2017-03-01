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

/* Component ==================================================================== */
class MyCart extends Component {
  static componentName = 'MyCart';

  constructor(props) {
    super(props);
    this.state = { search: "", selected: [], cartitems: [] };
  }

  renderCartitems = () => {
    var this_val = this;
    fetch(api_url+"cart/cartitems?access_token="+access_token+"&user_token="+user_token, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      this_val.setState({ cartitems: responseData["cartitems"] });
    }).done();
  }

  componentWillMount(){
    this.renderCartitems();
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
        leftElement="arrow-back"
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
          menu: { labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Log out']},
        }}
      />
    );
  }

  removeCartitem = (p_id) => {
    var thisVal = this;
    var myRequest = new Request(api_url+"cart/cartitem/"+p_id+"?access_token="+access_token, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        user_token: user_token,
      })
    });

    fetch(myRequest)
    .then((response) => response.json())
    .then(function(responseData) {
      if(responseData.success == true)
        thisVal.renderCartitems();
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  renderItmes = () => {
    var thisVal = this;
    var items = thisVal.state.cartitems;
    if (items != undefined){
      return items.map(function(item){
        return(
          <Card key={item.id}>
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
                  <Text h3>{item.product_id}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: Rs. 45.65/- incl.</Text>
                </View>
              </TouchableOpacity>
              <View style={{width: 50, height: 100, alignItems: 'flex-end'}}>
                <TouchableOpacity activeOpacity={0.8}
                  onPress={() => thisVal.removeCartitem(item.product_id)}>
                  <Spacer/>
                  <Icon name="delete" size={25} color="red" />
                </TouchableOpacity>
                <Spacer size={60} />
              </View>
            </View>
          </Card>
        );
      });
    } else
      return(<Text h3>No Items Added Yet!!!</Text>)
  }

  render = () => {
    return (
      <View style={[AppStyles.container]}>
        {this.renderToolbar()}
        <ScrollView>
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
