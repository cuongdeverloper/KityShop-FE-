import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addProductToCart, getCartForUser, getProductByCategoryApi, getProductByProductId } from "../../service/ApiService";
import './DetailProduct.scss';
import { Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../redux/reducer/cartsliceReducer";

const DetailProduct = () => {
    const params = useParams();
    let productId = params.productId;
    const [index, setIndex] = useState(0);
    const [dataDetailProduct, setDataDetailProduct] = useState(null);
    const [dataRelatedProduct, setDataRelatedProduct] = useState([]);
    const [quantity, setQuantity] = useState('');
    const dispatch = useDispatch()
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleThumbnailClick = (idx) => {
        setIndex(idx);
    };

    const getDataProductByProductId = async () => {
        let data = await getProductByProductId(productId);
        setDataDetailProduct(data);
        console.log('check', data);
    };

    const calculateSalePrice = (price, salesPercent) => {
        const numericPrice = parseFloat(price.replace('$', ''));
        const salesPercentValue = parseFloat(salesPercent) / 100;
        const salePrice = numericPrice - (numericPrice * salesPercentValue);
        return salePrice.toFixed(2); // To ensure two decimal places     
    };

    const SalesPrice = (price, salesPercent) => {
        const numericPrice = parseFloat(price.replace('$', ''));
        const salesPercentValue = parseFloat(salesPercent) / 100;
        const salePrice = numericPrice - (numericPrice * salesPercentValue);
        return (numericPrice - salePrice).toFixed(2); //  
    }

    const getRelatedProductByCategory = async () => {
        let response = await getProductByCategoryApi(dataDetailProduct.category);
        setDataRelatedProduct(response.data);
    }

    const handleBuying = async (size, quantity) => {
        try {
            // Fetch the current cart data
            let response = await getCartForUser();
            const currentCart = response.cart; // Adjust based on your actual response structure
    
            // Convert quantity to integer
            const parsedQuantity = parseInt(quantity, 10);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                throw new Error('Invalid quantity');
            }
    
            // Check if the product with the same size is already in the cart
            const existingProduct = currentCart.find(item => 
                item.product._id === dataDetailProduct._id && item.size === size
            );
    
            if (existingProduct) {
                // If the product exists, update the quantity
                const updatedQuantity = parsedQuantity; // Update to new quantity, not adding it again
                if (isNaN(updatedQuantity) || updatedQuantity <= 0) {
                    throw new Error('Invalid quantity after update');
                }
                response = await addProductToCart(dataDetailProduct._id, updatedQuantity, size, true); // Assuming 'true' indicates update
                console.log('Updated cart item:', response);
            } else {
                // If the product does not exist, add it to the cart
                response = await addProductToCart(dataDetailProduct._id, parsedQuantity, size);
                console.log('Added new item to cart:', response);
            }
    
            if (response && response.errorCode === 0) {
                dispatch(fetchCart(response.cart));
            }
    
            // Show success message
            if (response && response.message) {
                toast.success(response.message);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error("Failed to add/update product in cart:", error);
            toast.error("Failed to add/update product in cart.");
        }
    };
    
    
    
    
    useEffect(() => {
        getDataProductByProductId();
    }, [productId]);

    useEffect(() => {
        if (dataDetailProduct) {
            getRelatedProductByCategory();
        }
    }, [dataDetailProduct]);

    return (
        <div className="DetailProduct-container container">
            <div className="DetailProduct-header">
                {/* Add any necessary header content here */}
                <div className="row">
                    <div className="col-12" style={{ border: '2px solid red', margin: '15px 0', borderRadius: '6px' }}>
                        Free with deal upper 50$
                    </div>
                </div>
            </div>

            <div className="DetailProduct-body row">
                {dataDetailProduct ? (
                    <>
                        <div className="row col-4 row-prvimg">
                            <div className="DetailProduct-reviewProductImage col-12">
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {dataDetailProduct.productImages.map((image, idx) => (
                                        <Carousel.Item key={idx}>
                                            <img
                                                className="d-block w-100"
                                                src={image}
                                                alt={`Slide ${idx + 1}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="DetailProduct-thumbnails row mt-3">
                                {dataDetailProduct.productImages.map((image, idx) => (
                                    <div
                                        key={idx}
                                        className="DetailProduct-thumbnail col-4"
                                        onClick={() => handleThumbnailClick(idx)}
                                    >
                                        <img
                                            className="d-block w-100"
                                            src={image}
                                            alt={`Thumbnail ${idx + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="DetailProduct-reviewProductText col-8 container-fluid">
                            <div className="row">
                                <span className="col-12">
                                    {dataDetailProduct.name}
                                </span>
                            </div>
                            <div className="row">
                                <p>Code: #{dataDetailProduct._id}</p>
                            </div>
                            <div className="row">
                                <h5 className="description-product">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fire " viewBox="0 0 16 16">
                                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                                    </svg>
                                    {dataDetailProduct.description}
                                </h5>
                            </div>
                            <div className="row">
                                <h6 className="col-12" style={{ color: 'red', textDecoration: 'line-through' }}>
                                    Origin price: {dataDetailProduct.price}
                                </h6>
                                <h5 className="col-12">
                                    Sales Price: {calculateSalePrice(dataDetailProduct.price, dataDetailProduct.salesPercent)}$
                                </h5>
                                <span style={{ marginLeft: '15px' }}>
                                    (Saving: {SalesPrice(dataDetailProduct.price, dataDetailProduct.salesPercent)}$)
                                </span>
                            </div>

                            <div className="row" style={{ margin: '6px 0' }}>

                                <div className="col-12 row product-related">
                                    <h4 style={{ textAlign: 'center' }}>Related Product</h4>
                                    {dataRelatedProduct.slice(0, 3).map((product, idx) => (
                                        <img
                                            key={idx} // Adding a key prop for each element in the list
                                            className="d-block col-2"
                                            src={product.previewImages[0]} // Assuming each product has a previewImages array
                                            alt={`Slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="row">
                                <table className="table col-12">

                                    <tbody>
                                        {dataDetailProduct.sizes.map((dt, idx) => (
                                            <tr key={idx} className="row">
                                                <td className="col-3"><span>{dt.size}</span></td>
                                                <td className="col-3"><span style={{ fontWeight: '600' }}>{dt.quantity}</span> remaining</td>
                                                <td className="col-3">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="inputGroup-sizing-sm">Quanity</span>
                                                        </div>
                                                        <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(event)=>setQuantity(event.target.value)}/>
                                                    </div>
                                                </td>
                                                <td className="col-3">
                                                    <span onClick={() => handleBuying(dt.size, quantity)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-plus" viewBox="0 0 16 16" style={{ color: 'red', marginRight: '10px' }}>
                                                        <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                                                        <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                                    </svg>Buying
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="DetailProduct-showImage row col-12">
                            {dataDetailProduct.productImages.map((image, idx) => (
                                <div
                                    key={idx}
                                    className="DetailProduct-thumbnail col-6"
                                    onClick={() => handleThumbnailClick(idx)}
                                >
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt={`Thumbnail ${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Loading product details...</p>
                )}
            </div>

            <div className="DetailProduct-footer">
                {/* Add any necessary footer content here */}
            </div>
        </div>
    );
};

export default DetailProduct;
