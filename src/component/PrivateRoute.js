import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element }) => {
    const isAuthenticated = localStorage.getItem('accessToken');

    if (isAuthenticated) {
        return <Route path={path} element={element} />;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;
