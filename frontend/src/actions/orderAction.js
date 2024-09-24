import { CREATE_ORDER_SUCCESS,CREATE_ORDER_REQUEST,CREATE_ORDER_FAIL,
    CREATE_PAYMENT_REQUEST,CREATE_PAYMENT_SUCCESS,CREATE_PAYMENT_FAIL,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
    ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS,ORDER_DETAIL_FAIL,
    CLEAR_ERRORS
 } from "../constants/orderConstant";

import axios from "axios";


export const createOrder = (session_id) => async (dispatch) => {
  try {
      console.log('Creating order with session ID:', session_id); // Debugging log
      dispatch({ 
          type: CREATE_ORDER_REQUEST,
      });
      const config = {
          headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post("/api/v1/eats/orders/new", { session_id }, config);
      dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: data,
      });
  
  } catch (error) {
      console.log(error);
      console.error('Order creation failed:', error.response?.data?.message || 'Something went wrong'); // Improved error handling
      dispatch({ type: CREATE_ORDER_FAIL, payload: error.response?.data?.message || 'Something went wrong' });
  }
};

export const payment = (items, restaurant) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PAYMENT_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post("/api/v1/payment/process", { items, restaurant }, config);
      
      console.log("Received data from backend:", data); // Add this line to see the response in the console
      dispatch({ type: CREATE_PAYMENT_SUCCESS });
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Payment URL not found in response");
      }
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const myOrders = () => async (dispatch) => {
    try {
      console.log("Dispatching MY_ORDER_REQUEST");
      dispatch({ type: MY_ORDER_REQUEST });
  
      const { data } = await axios.get('/api/v1/eats/orders/me/myOrders');
      
      console.log("Received data:", data);
  
      dispatch({
        type: MY_ORDER_SUCCESS,
        payload: data.orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      dispatch({
        type: MY_ORDER_FAIL,
        payload: error.response?.data?.message || 'Something went wrong',
      });
    }
  };


export const getOrderDetails = (id) => async (dispatch)  => {

    try {
    
    dispatch({ type: ORDER_DETAIL_REQUEST });
    
    const { data } = await axios.get(`/api/v1/eats/orders/${id}`);
    
    dispatch({
    type: ORDER_DETAIL_SUCCESS,
    payload: data.order,
    });
    
    } catch (error) {
    
    dispatch({
    type: ORDER_DETAIL_FAIL,
    payload: error.response.data.message,
    });
    
    }
    
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS,
    });
};
    