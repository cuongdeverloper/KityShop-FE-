export const Fetch_Cart_Success = 'fetch cart success';
export const Fetch_cart_Default = 'fetch cart default'
export const fetchCart = (cart) => {
    return {
        type: Fetch_Cart_Success,
        payload: cart
    }
}
export const fetchCartDefault = () =>{
    return{
        type: Fetch_cart_Default
    }
}