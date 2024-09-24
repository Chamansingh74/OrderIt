import { ADD_TO_CART,REMOVE_ITEM_CART,FETCH_CART,UPDATE_CART_ITEM,CLEAR_CART } from "../constants/cartConstant";

const initialState = {
    cartItems: [],
    restaurant: {},
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                restaurant: action.payload.restaurant || state.restaurant,
                cartItems: action.payload.items || state.cartItems
            };

        case UPDATE_CART_ITEM:
            return {
                ...state,
                cartItems: action.payload.items || state.cartItems
            };

        case FETCH_CART:
            return {
                ...state,
                restaurant: action.payload.restaurant || state.restaurant,
                cartItems: action.payload.items || state.cartItems
            };

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: action.payload.items || []
            };

            case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };

        default:
            return state;
    }
};
