import { ADD_TO_CART, FETCH_CART, UPDATE_CART_ITEM, REMOVE_ITEM_CART } from "../constants/cartConstant";
import axios from "axios";

export const fetchCartItems = (alert) => async (dispatch) => {
    try {
        const response = await axios.get("/api/v1/eats/cart/get-cart");
       // console.log("Cart API Response:", response.data);
        if (!response.data.data || response.data.data.items.size === 0) {
            if (alert) {
                alert.info("No food items found in the cart.");
            }
        }
        dispatch({
            type: FETCH_CART,
            payload: response.data.data,
        });
    } catch (error) {
        console.error("Fetch cart error:", error);
        if (alert) {
            alert.info("Cart is hungry");
        }
    }
};


// Add to Cart 
export const addItemToCart = (foodItemId, restaurant, quantity, alert) => async (dispatch, getState) => {
    try {
        const { user } = getState().auth;
        const response = await axios.post("/api/v1/eats/cart/add-to-cart", {
            userId: user._id,
            foodItemId: foodItemId,
            restaurantId: restaurant,
            quantity,
        });

        alert.success("Item added to cart");
        dispatch({
            type: ADD_TO_CART,
            payload: response.data.cart,
        });

    } catch (error) {
        alert.error(error.response ? error.response.data.message : error.message);
    }
};

//Update Cart Item
export const updateCartQuantity = (foodItemId, quantity, alert) => async (dispatch, getState) => {
    try {
        const { user } = getState().auth;
        const response = await axios.post("/api/v1/eats/cart/update-cart-item", {
            userId: user._id,
            foodItemId: foodItemId,
            quantity: quantity,
        });
        
        dispatch({
            type: UPDATE_CART_ITEM,
            payload: response.data
        });

    } catch (error) {
        alert.error(error.response ? error.response.data.message : error.message);
    }
};


// Remove Item From Cart
export const removeItemFromCart = (foodItemId, alert) => async (dispatch, getState) => {
    try {
        const { user } = getState().auth;
        if (typeof foodItemId === "object") {
            foodItemId = foodItemId._id;
        }
        const response = await axios.delete("/api/v1/eats/cart/delete-cart-item", {
            data: { userId: user._id, foodItemId },
        });

        dispatch({
            type: REMOVE_ITEM_CART,
            payload: response.data,
        });

    } catch (error) {
        if (alert) {
            alert.error(error.response ? error.response.data.message : error.message);
        }
    }
};
