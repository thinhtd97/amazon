import Header from "./components/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/admin/user/:id" component={UserEditScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/productList" component={ProductListScreen} exact />
          <Route path="/admin/products/page/:pageNumber" component={ProductListScreen} exact />
          <Route path="/admin/product/:id" component={ProductDetailsScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/orders" component={OrderListScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={LoginScreen} />
          <Route path="/signup" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} exact />
          
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
