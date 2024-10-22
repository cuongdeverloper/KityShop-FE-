import { Fetch_cart_Default } from "../action/cartsliceAction";

const INITIAL_STATE = {
    cart: [],  // Initialize cart as an empty array
};

const cartsliceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Fetch_Cart_Success:
            return {
                ...state,
                cart: action.payload,  
            };
        case Fetch_cart_Default:
            return{
                ...state,
                cart:''
            }
        default:
            return state;
    }
};

export default cartsliceReducer;
export const Fetch_Cart_Success = 'fetch cart success';

export const fetchCart = (cart) => {
    return {
        type: Fetch_Cart_Success,
        payload: cart
    }
}