import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getProductByCategoryApi } from "../../../service/ApiService";
import './Product.scss';
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
    const navigate = useNavigate();
    const params = useParams();
    const categoryParams = params.category; // Get the category from the URL params
    const [dataShirt, setDataShirt] = useState([]);
    
    // Fetch products based on category
    const getShirtApi = async () => {
        try {
            const response = await getProductByCategoryApi(categoryParams);
            setDataShirt(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Run when the component mounts or when the category changes
    useEffect(() => {
        getShirtApi();
        // Dynamically update the document title based on the category
        document.title = `Kity Shop | ${categoryParams.charAt(0).toUpperCase() + categoryParams.slice(1)}`;
    }, [categoryParams]); // Add categoryParams as a dependency

    // Calculate the sale price based on the original price and sales percentage
    const calculateSalePrice = (price, salesPercent) => {
        const numericPrice = parseFloat(price.replace('$', ''));
        const salesPercentValue = parseFloat(salesPercent) / 100;
        const salePrice = numericPrice - (numericPrice * salesPercentValue);
        return salePrice.toFixed(2); // Ensure two decimal places
    };

    return (
        <div className="Shirt-container">
            <div className="Shirt-content container">
                {dataShirt && dataShirt.length === 0 && <span>Oops! Something went wrong!</span>}
                <Row>
                    {dataShirt && dataShirt.map((product, index) => (
                        <Col md={3} sm={6} key={`${index}-product`}>
                            <Card className="card-list" style={{ width: '100%' }}>
                                <span className="img-container" 
                                    onClick={() => { 
                                        navigate(`/shop/detail/${product._id}`, {
                                            state: { 
                                                productName: product.name, 
                                                productImagePreview: product.previewImages, 
                                                productImage: product.productImages 
                                            }
                                        });
                                    }}
                                >
                                    <img className="preview" src={product.previewImages[0]} alt={product.name}/>
                                    {product.previewImages[1] && (
                                        <img className="hover" src={product.previewImages[1]} alt={product.name} />
                                    )}
                                </span>
                                <Card.Body>
                                    <Card.Title className="card-title">{product.name}</Card.Title>
                                    <Card.Text>
                                        <span className="price">
                                            <span className="text-dark price-product">
                                                ${product.price}
                                            </span>
                                            {product.salesPercent && (
                                                <span className="text-danger sale-product">
                                                    ${calculateSalePrice(product.price, product.salesPercent)} 
                                                </span>
                                            )}
                                        </span>
                                    </Card.Text>
                                    <Button variant="primary">Buy Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Product;
