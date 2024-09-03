import React, { useEffect, useState } from 'react';
import Header from '../Nav Header/Header';
import './HomePage.scss';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { decodeDataGoogle, getAllCategoryHomePage, getCartForUser, searchHomepageByCategory } from '../../service/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin, doLogout } from '../../redux/action/userAction';
import Carousel from 'react-bootstrap/Carousel';
import { fetchCart, fetchCartDefault } from '../../redux/action/cartsliceAction';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0);
    const [dataIntroduce, setDataIntroduce] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    };

    const decodeTokenDataGoogle = async () => {
        try {
            const token = Cookies.get('accessToken');
            if (token && !isTokenExpired(token)) {
                const response = await decodeDataGoogle(token);
                dispatch(doLogin(response));
            } else {
                dispatch(doLogout());
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            dispatch(doLogout());
        }
    };

    const fetchIntroduceData = async () => {
        try {
            const response = await searchHomepageByCategory('Introduce');
            setDataIntroduce(response.data);
        } catch (error) {
            console.error('Error fetching Introduce data:', error);
        }
    };

    const fetchCategoryData = async () => {
        try {
            const response = await getAllCategoryHomePage();
            setDataCategory(response.data);
        } catch (error) {
            console.error('Error fetching Category data:', error);
        }
    };

    const fetchCartData = async () => {
        try {
            if (isAuthenticated) {
                const response = await getCartForUser();
                dispatch(fetchCart(response.cart));
            } else {
                dispatch(fetchCartDefault());
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        const initializeHomePage = async () => {
            await decodeTokenDataGoogle();
            await fetchIntroduceData();
            await fetchCategoryData();
            await fetchCartData();
            document.title = "Kity Shop | Make you be luxury";
        };

        initializeHomePage();
    }, [isAuthenticated, dispatch]);

    return (
        <div className="HomePage-container">
            <Header />
            
            <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginTop: '80px' }}>
                {dataIntroduce.map((item, idx) => (
                    <Carousel.Item key={idx}>
                        <img
                            className="d-block w-100"
                            src={item.mainImage[0]}
                            alt={`Slide ${idx + 1}`}
                        />
                        <Carousel.Caption>
                            <p>{item.description || 'Default description text for this slide.'}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            <div className="container mt-4">
                <div className="row">
                    {dataCategory.map((category, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                <img
                                    src={category.mainImage[0]}
                                    className="card-img-top custom-hover"
                                    alt={category.title}
                                    onClick={()=>{navigate(`/shop/product/${category.category}`)}}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{category.category}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
