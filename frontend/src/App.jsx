import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import store from "./store";
import { loadUser } from "./actions/userAction";

const Home = lazy(() => import("./components/layouts/Home"));
const Menu = lazy(() => import("./components/layouts/Menu"));
const Login = lazy(() => import("./components/users/Login"));
const Register = lazy(() => import("./components/users/Register"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Profile = lazy(() => import("./components/users/Profile"));
const ForgotPassword = lazy(() => import("./components/users/ForgotPassword"));
const UpdateProfile = lazy(() => import("./components/users/UpdateProfile"));
const NewPassword = lazy(() => import("./components/users/NewPassword"));
const OrderSuccess = lazy(() => import("./components/cart/OrderSuccess"));
const ListOrders = lazy(() => import("./components/order/ListOrders"));
const OrderDetails = lazy(() => import("./components/order/OrderDetails"));

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <div className="container container-fluid">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/eats/stores/:id/menus" element={<Menu />} />
                <Route path="/users/login" element={<Login />} />
                <Route path="/users/signup" element={<Register />} />
                <Route path="/users/me" element={<Profile />} />
                <Route path="/users/me/update" element={<UpdateProfile />} />
                <Route path="/users/forgotPassword" element={<ForgotPassword />} />
                <Route path="/users/resetPassword/:token" element={<NewPassword />} />
                <Route path="/cart" element={<Cart />} /> 
                <Route path="/success" element={<OrderSuccess />} /> 
                <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
                <Route path="/eats/orders/:id" element={<OrderDetails />} />
                <Route path="#" element={<h1>The Page does not Exist</h1>} />  
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
