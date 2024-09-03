import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode
import { deleteDetailCart, getCartForUser } from "../../service/ApiService"; 
import Header from "../Nav Header/Header";
import './ShoppingCartHome.scss';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../redux/action/cartsliceAction";

const ShoppingCartHome = () => {
    const [dataCart, setDataCart] = useState([]);
    const [totalCartValue, setTotalCartValue] = useState(0);
    const [shippingFee, setShippingFee] = useState(2); // Default shipping fee
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); 
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    };

    const getListCartForUser = async () => {
        try {
            const token = Cookies.get('accessToken');

            if (token && !isTokenExpired(token)) {
                let response = await getCartForUser();
                if (response.errorCode === 0) {
                    setDataCart(response.cart);
                    dispatch(fetchCart(response.cart)); // Dispatch the action to store cart data in Redux
                    calculateTotalCartValue(response.cart);
                } else {
                    console.log('Error fetching cart data:', response.message);
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            navigate('/');
        }
    };

    const calculateSalePrice = (price, salesPercent) => {
        const numericPrice = parseFloat(price.replace('$', ''));
        const salesPercentValue = parseFloat(salesPercent) / 100;
        const salePrice = numericPrice * (1 - salesPercentValue);
        return salePrice.toFixed(2);
    };

    const SalesPrice = (price, salesPercent) => {
        const numericPrice = parseFloat(price.replace('$', ''));
        const salesPercentValue = parseFloat(salesPercent) / 100;
        const salePrice = numericPrice - (numericPrice * salesPercentValue);
        return (numericPrice - salePrice).toFixed(2);
    };

    const calculateTotal = (quantity, price) => {
        const quantityTotal = parseFloat(quantity);
        const numericPrice = parseFloat(price.replace('$', ''));
        const total = numericPrice * quantityTotal;
        return total.toFixed(1);
    };

    const calculateTotalCartValue = (cartItems) => {
        let totalValue = 0;
        cartItems.forEach((product) => {
            const itemTotal = parseFloat(calculateTotal(product.quantity, calculateSalePrice(product.product.price, product.product.salesPercent)));
            totalValue += itemTotal;
        });

        setTotalCartValue(totalValue);
        setShippingFee(totalValue > 50 ? 0 : 2); // Set shipping fee based on total value
    };

    const deleteDetailCt = async (productId, size) => {
        try {
            let response = await deleteDetailCart(productId, size);
            console.log('Delete Response:', response);
    
            // Check for successful response and show success message
            if (response && response.message) {
                toast.success(response.message);
            } else {
                throw new Error('Unexpected response format');
            }
    
            // Refresh cart data after deletion
            await getListCartForUser();
        } catch (error) {
            console.error('Error deleting item from cart:', error);
            toast.error('Failed to delete item from cart.');
        }
    };
    
    useEffect(() => {
        getListCartForUser();
        document.title = "Kity Shop | My cart"; // Replace with your desired title
    }, []); // Run on initial load

    return (
        <div className="ShoppingCartHome-container container">
            <div className="ShoppingCartHome-header">
                <Header />
                <div className="row">
                    <div className="col-12" style={{ border: '1px solid red', borderRadius: '6px' }}>
                        Free with deal over $50 | Shipping Fee: ${shippingFee}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h5>Cart detail description</h5>
                        {dataCart && dataCart.length > 0 ? (
                            <>
                                {dataCart.map((product, index) => (
                                    <div key={index} className="row" style={{marginBottom:'15px'}}>
                                        <hr/>
                                        <img style={{ height: '150px', width: '150px' }} className="col-4" src={product.product.previewImages[0]} alt="Product Preview" />
                                        <div className="col-8">
                                            <span className="span-hover-detailproduct" onClick={()=>navigate(`/shop/detail/${product.product._id}`)}>{product.product.name} - {product.product.colors[0]} - {product.size}</span>
                                            <p>Quantity: {product.quantity} * {calculateSalePrice(product.product.price, product.product.salesPercent)}$ (Saving {SalesPrice(product.product.price, product.product.salesPercent)}$)</p>
                                            <hr/>
                                            <p style={{margin:'0px'}}>= {calculateTotal(product.quantity, calculateSalePrice(product.product.price, product.product.salesPercent))}$</p>
                                            <button type="button" className="btn btn-secondary" onClick={() => deleteDetailCt(product.product._id, product.size)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                                <hr/>
                                <div className="row">
                                    <div className="col-6"><strong>Total:</strong></div>
                                    <div className="col-6"><strong>${totalCartValue}</strong></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><strong>Shipping Fee:</strong></div>
                                    <div className="col-6"><strong>${shippingFee}</strong></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><strong>Grand Total:</strong></div>
                                    <div className="col-6"><strong>${(totalCartValue + shippingFee).toFixed(2)}</strong></div>
                                </div>
                            </>
                        ) : (
                            <p>No items in the cart.</p>
                        )}
                    </div>
                    <div className="col-6">
                        <h5>Customer description</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartHome;
