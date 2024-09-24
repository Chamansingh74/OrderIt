import { GET_MENU_FAIL, GET_MENU_REQUEST, GET_MENU_SUCCESS } from "../constants/menuConstant";

const intialState = {
    menus: [],
    loading: false,
    error: null,
}

export const menuReducer = (state = intialState, action) => {
       switch(action.type) {
            case GET_MENU_REQUEST:
                return {
                    ...state,
                    loading:true,
                    error:null,
                };
            case GET_MENU_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    menus: action.payload,
                }

            case GET_MENU_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
                
            default :
            return state;    
       }
}