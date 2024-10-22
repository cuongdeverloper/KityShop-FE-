import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage/HomePage";
import Logout from "./Auth/Logout";
import ProfileManage from "./components/User/ProfileManage";
import User from "./components/User/User";
import ShopProduct from "./components/Products/ShopProduct";
import DetailProduct from "./components/Products/DetailProduct";
import ShoppingCartHome from "./components/Shooping cart/ShoppingCartHome";
import Register from "./Auth/Register/Register";
import Login from "./Auth/Login/Login";
import AdminManager from "./components/Admin/AdminManager";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Product from "./components/Products/Product/Product"
import AdminManageProduct from "./components/Admin/Product/AdminManageProduct";
import AdminManageUser from "./components/Admin/User/AdminManageUser";
import AdminAddProduct from "./components/Admin/Product/AdminAddProduct";
const Layout = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/AdmManager" element={
                            <PrivateRoute>
                                <AdminManager/>
                            </PrivateRoute>} >
                            <Route path="Product" element={<AdminManageProduct />} />
                            <Route path="User" element={<AdminManageUser />} />
                            <Route path="Product/:category" element={<AdminAddProduct />} />

                        </Route>

                        <Route path="/user" element={<User />}>
                            <Route index element={<ProfileManage />} />
                        </Route>
                        <Route path="/shop" element={<ShopProduct />} >
                            <Route path="product/:category" element={<Product />} />
                            <Route path="detail/:productId" element={<DetailProduct />} />
                        </Route>

                        <Route path="/shoppingcart" element={<ShoppingCartHome />} />

                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    );
};

export default Layout;
