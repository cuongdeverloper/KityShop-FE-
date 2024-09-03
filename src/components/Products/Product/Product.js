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
    const params = useParams()
    const categoryParams = params.category;
    const [dataShirt, setDataShirt] = useState([]);
    
    const getShirtApi = async () => {
        try {
            const response = await getProductByCategoryApi(categoryParams);
            // console.log(response)
            setDataShirt(response.data);
        } catch (error) {
            console.error("Error fetching shirts:", error);
        }
    };

    useEffect(() => {
        getShirtApi();
        document.title = "Kity Shop | Shirt"; // Replace with your desired title

    }, []);

    const calculateSalePrice = (price, salesPercent) => {
        const numericPrice = parseFloat(price.replace('$', ''));
        const salesPercentValue = parseFloat(salesPercent) / 100;
        const salePrice = numericPrice - (numericPrice * salesPercentValue);
        return salePrice.toFixed(2); // To ensure two decimal places

       
    };

    return (
        <div className="Shirt-container">
            <div className="Shirt-content container">
                {dataShirt && dataShirt.length === 0 && <span>Oops! Something wrong !</span>}
                <Row>
                    {dataShirt && dataShirt.map((product, index) => (
                        <Col md={3} sm={6} key={`${index}-product`}>
                            <Card className="card-list" style={{ width: '100%' }}>
                                <span className="img-container" 
                                    onClick={() => {navigate(`/shop/detail/${product._id}`, {state :{productName: product.name, productImagePreview : `${product.previewImages}`,productImage : `${product.productImages}`}})}}
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
