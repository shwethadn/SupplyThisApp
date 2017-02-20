import FirstPage from './App/logoPage.react';
import HomePage from './App/HomePage.react';

import Login from './Auth/loginPage.react';
import ProductList from './Products/ProductList.react';
import ProductDetails from './Products/ProductDetails.react';
import MyCart from './Cart/MyCartView.react';
import OrderSummery from './Cart/OrderSummery.react';

export default {
  firstPage: {
    title: 'Select component',
    Page: FirstPage,
  },
  login: {
    title: "Login to continue",
    Page: Login,
  },
  homePage: {
    title: "Home",
    Page: HomePage,
  },
  productList: {
    title: "Products List View",
    Page: ProductList,
  },
  productDetails: {
    title: "Products Details",
    Page: ProductDetails,
    props: {prod_id: ""},
  },
  myCart: {
      title: "My Cart Page",
      Page: MyCart,
  },
  orderSummery: {
      title: "Order Summery details",
      Page: OrderSummery,
  },
};
