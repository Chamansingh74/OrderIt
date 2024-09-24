import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS,ORDER_DETAIL_FAIL,
 } from "../constants/orderConstant";


const intialState = {
    loading : false,
    error: null,
    order: null,
};

export const newOrderReducer = (state = intialState,action) => {
    switch(action.type)
    {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            };
        
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                order:action.payload,
            };

        case CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };

        default:
            return state;
    }
};

export const myOrderReducer = (state = {orders: []},action) => {
    switch(action.type)
    {
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            };
        
        case MY_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                orders:action.payload,
            };

        case MY_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };

        default:
            return state;
    }
};


export const orderDetailsReducer = (state = {orders: []},action) => {
    switch(action.type)
    {
        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading:true,
            };
        
        case ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                loading:false,
                order:action.payload,
            };

        case ORDER_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };

        default:
            return state;
    }
};