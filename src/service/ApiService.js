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
const GetUserPaginateApi = (page, limit) => {
    return axios.get('v1/api/user-pagination', {
        params: {
            page,
            limit
        }
    });
};
const getUserApi = () => {
    return axios.get('v1/api/user')
}

const updateUserApi = (id, name, role, sex, phoneNumber,profileImage) => {
    const data = {
        id: id,
        name: name,
        role: role,
        sex: sex,
        phoneNumber: phoneNumber,
        profileImage:profileImage
    };

    return axios.put(`v1/api/user`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const deleteUserApi = (id) => {
    return axios.delete(`v1/api/user`, {
        data: { id }
    });
};


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
const getListCategoriesApi = () =>{
    return axios.get('/v1/api/product/categories')
}

const deleteProductByIdApi = (productId) => {
    return axios.delete(`/v1/api/product/${productId}`)
        .catch(error => {
            console.error('Error deleting product:', error); // Debugging
        });
};

const updateProductByProductId = async (productId, productDetails) => {
    try {
        const formData = new FormData();
        
        // Append non-file fields
        formData.append('name', productDetails.name);
        formData.append('description', productDetails.description);
        formData.append('category', productDetails.category);
        formData.append('price', productDetails.price);
        formData.append('sizes', JSON.stringify(productDetails.sizes)); 
        formData.append('colors', productDetails.colors.join(',')); 
        formData.append('salesPercent', productDetails.salesPercent);

        // Append file fields
        if (productDetails.previewImages) {
            productDetails.previewImages.forEach(file => {
                formData.append('previewImages', file);
            });
        }
        if (productDetails.productImages) {
            productDetails.productImages.forEach(file => {
                formData.append('productImages', file);
            });
        }

        const response = await axios.put(`/v1/api/productById/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};
const createOrder = async (orderData) => {
    try {
        const token = Cookies.get('accessToken'); // Retrieve the token from cookies

    if (!token) {
        throw new Error('No token found, please log in.');
    }
        // Assuming your API endpoint is '/api/orders' (adjust as necessary)
        const response = await axios.post('/v1/api/createOrder', orderData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response
    } catch (error) {
        console.error('Error creating order:', error);
        // You might want to return an error object to handle it in your component
        return { errorCode: 1, message: error.response ? error.response.data.message : 'Error occurred while creating the order' };
    }
};
const apiAdmGetAllOrders = async()=>{
    try {
        const token = Cookies.get('accessToken'); // Retrieve the token from cookies

    if (!token) {
        throw new Error('No token found, please log in.');
    }
        // Assuming your API endpoint is '/api/orders' (adjust as necessary)
        const response = await axios.get('/v1/api/getAllOrder', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response
    } catch (error) {
        console.error('Error get order:', error);
        // You might want to return an error object to handle it in your component
        return { errorCode: 1, message: error.response ? error.response.data.message : 'Error occurred while creating the order' };
    }
}
const apiAdmUpdateOrder = async (orderId, updateData) => {
    try {
        const token = Cookies.get('accessToken'); 

        if (!token) {
            throw new Error('No token found, please log in.');
        }
        
        // Assuming your API endpoint is '/api/orders/update' (adjust as necessary)
        const response = await axios.put(`/v1/api/updateOrder/${orderId}`, updateData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response
    } catch (error) {
        console.error('Error updating order:', error);
        // Return an error object to handle it in your component
        return { errorCode: 1, message: error.response ? error.response.data.message : 'Error occurred while updating the order' };
    }
};
export {
    LoginApi,RegisterApi,
    UpdateUserApi,
    getUserApi,
    getProductByCategoryApi,
    getProductByProductId,loginWGoogle,decodeDataGoogle,getCartForUser,
    addProductToCart,deleteDetailCart,searchHomepageByCategory,getAllCategoryHomePage,
    GetUserPaginateApi,updateUserApi,deleteUserApi,getListCategoriesApi,deleteProductByIdApi,
    updateProductByProductId,createOrder,apiAdmGetAllOrders,apiAdmUpdateOrder
}
