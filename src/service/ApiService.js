import axios from '../utils/AxiosCustomize';
import FormData from 'form-data'; // Import FormData
import Cookies from 'js-cookie';

const LoginApi = (userEmail, userPassword) => {
    return axios.post('v1/api/login', { email: userEmail, password: userPassword });
}
const RegisterApi = (email, password, name, role,sex, phoneNumber, profileImage) => {
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('name', name);
    form.append('role', role);
    form.append('sex', sex);
    form.append('phoneNumber', phoneNumber);

    // Check if profileImage is provided and append it to the form data
    if (profileImage) {
        form.append('profileImage', profileImage);
    }

    return axios.post('v1/api/user', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const UpdateUserApi = (id, email, name, role, sex, phoneNumber) => {
    const form = new FormData();
    form.append('id', id);
    form.append('email', email);
    form.append('name', name);
    form.append('role', role);
    form.append('sex', sex);
    form.append('phoneNumber', phoneNumber);

    return axios.put('v1/api/user', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getUserApi = () => {
    // Implementation of getUserApi function should be added here
}

const getProductByCategoryApi = (category) => {
    return axios.get('v1/api/product-category', {
        params: {
            category: category
        }
    });
}

const getProductByProductId = (productId) => {
    return axios.get(`v1/api/product/${productId}`);
}

const loginWGoogle = () =>{
    return axios.get(`/auth/google/callback`)
}
const decodeDataGoogle = (token) =>{
    return axios.post(`/v1/api/decode-token`, { token });
}
const getCartForUser = () => {
    // Retrieve the access token from cookies or wherever you are storing it
    const token = Cookies.get('accessToken'); // Adjust the key if necessary

    // Check if the token exists
    if (!token) {
        throw new Error('No token found, please log in.');
    }

    // Make the request with the Authorization header
    return axios.get(`/v1/api/myshoppingcart`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
const addProductToCart = (productId, quantity, size) => {
    const token = Cookies.get('accessToken'); // Retrieve the token from cookies

    if (!token) {
        throw new Error('No token found, please log in.');
    }

    const data = {
        productId,
        quantity,
        size,
    };

    return axios.post('/v1/api/shoppingcart', data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
}
const deleteDetailCart = (productId, size) => {
    const token = Cookies.get('accessToken'); // Retrieve the token from cookies

    if (!token) {
        throw new Error('No token found, please log in.');
    }

    const data = {
        productId,
        size,
    };

    console.log('Sending DELETE request to /v1/api/myshoppingcart with data:', data); // Debugging

    return axios({
        method: 'delete',
        url: '/v1/api/myshoppingcart',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: data,
    }).catch(error => {
        console.error('Error in DELETE request:', error); // Debugging
    });
}
const searchHomepageByCategory = (category) => {
    return axios.post('/v1/api/categoryHomepage-search', { category });
};

const getAllCategoryHomePage = () =>{
    return axios.get('/v1/api/categoryHomepage')
}

export {
    LoginApi,RegisterApi,
    UpdateUserApi,
    getUserApi,
    getProductByCategoryApi,
    getProductByProductId,loginWGoogle,decodeDataGoogle,getCartForUser,
    addProductToCart,deleteDetailCart,searchHomepageByCategory,getAllCategoryHomePage
}
