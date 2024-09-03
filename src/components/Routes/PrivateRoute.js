import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const userRole = useSelector(state => state.user.account.role);
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    if (userRole !== 'Admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
