import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createOrder, deleteDetailCart, getCartForUser } from "../../service/ApiService"; 
import Header from "../Nav Header/Header";
import './ShoppingCartHome.scss';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/action/cartsliceAction";

const ShoppingCartHome = () => {
    const [dataCart, setDataCart] = useState([]);
    const [totalCartValue, setTotalCartValue] = useState(0);
    const [shippingFee, setShippingFee] = useState(2); // Default shipping fee
    const [address, setAddress] = useState(""); // State for address
    const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.account.id);

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
                const response = await getCartForUser();
                if (response.errorCode === 0) {
                    setDataCart(response.cart);
                    dispatch(fetchCart(response.cart)); 
                    calculateTotalCartValue(response.cart);
                } else {
                    console.log('Error fetching cart data:', response.message);
                    toast.error('Error fetching cart data.');
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            toast.error('Error fetching cart data.');
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
        const salePrice = numericPrice * (1 - salesPercentValue);
        return (numericPrice - salePrice).toFixed(2);
    };

    const calculateTotal = (quantity, price) => {
        const quantityTotal = parseFloat(quantity);
        const numericPrice = parseFloat(price.replace('$', ''));
        const total = numericPrice * quantityTotal;
        return total.toFixed(2);
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
            const response = await deleteDetailCart(productId, size);
            if (response && response.message) {
                toast.success(response.message);
            } else {
                throw new Error('Unexpected response format');
            }
    
            await getListCartForUser();
        } catch (error) {
            console.error('Error deleting item from cart:', error);
            toast.error('Failed to delete item from cart.');
        }
    };

    const handleCreateOrder = async () => {
        const totalAmount = (totalCartValue + shippingFee).toFixed(2);
        try {
            const orderData = {
                address,
                phoneNumber,
                products: dataCart.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    size: item.size
                })),
                totalAmount,
                userId
            };

            const response = await createOrder(orderData); // Call the createOrder function
            if (response && response.errorCode === 0) {
                toast.success('Order created successfully!');
                setDataCart([]); // Reset cart
                setTotalCartValue(0);
                setShippingFee(2);
            } 
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('An error occurred while creating the order.');
        }
    };
    

    useEffect(() => {
        getListCartForUser();
        document.title = "Kity Shop | My Cart";
    }, []);

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
                        <h5>Cart Detail Description</h5>
                        {dataCart && dataCart.length > 0 ? (
                            <>
                                {dataCart.map((product, index) => (
                                    <div key={index} className="row" style={{ marginBottom: '15px' }}>
                                        <hr />
                                        <img style={{ height: '150px', width: '150px' }} className="col-4" src={product.product.previewImages[0]} alt="Product Preview" />
                                        <div className="col-8">
                                            <span className="span-hover-detailproduct" onClick={() => navigate(`/shop/detail/${product.product._id}`)}>
                                                {product.product.name} - {product.product.colors[0]} - {product.size}
                                            </span>
                                            <p>Quantity: {product.quantity} * {calculateSalePrice(product.product.price, product.product.salesPercent)}$ (Saving {SalesPrice(product.product.price, product.product.salesPercent)}$)</p>
                                            <hr />
                                            <p style={{ margin: '0px' }}>= {calculateTotal(product.quantity, calculateSalePrice(product.product.price, product.product.salesPercent))}$</p>
                                            <button type="button" className="btn btn-secondary" onClick={() => deleteDetailCt(product.product._id, product.size)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                                <div className="row">
                                    <div className="col-6"><strong>Total:</strong></div>
                                    <div className="col-6"><strong>${totalCartValue.toFixed(2)}</strong></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><strong>Shipping Fee:</strong></div>
                                    <div className="col-6"><strong>${shippingFee}</strong></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><strong>Grand Total:</strong></div>
                                    <div className="col-6"><strong>${(totalCartValue + shippingFee).toFixed(2)}</strong></div>
                                </div>
                                <button className="btn btn-primary" onClick={handleCreateOrder}>Create Order</button>
                            </>
                        ) : (
                            <p>No items in the cart.</p>
                        )}
                    </div>
                    <div className="col-6">
                        <h5>Customer Description</h5>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input 
                                type="text" 
                                id="address" 
                                className="form-control" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                placeholder="Enter your address" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input 
                                type="tel" 
                                id="phoneNumber" 
                                className="form-control" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                placeholder="Enter your phone number" 
                                required 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartHome;
