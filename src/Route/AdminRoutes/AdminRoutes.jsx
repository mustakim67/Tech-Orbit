import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <span className='loading loading-spinner loading-xl'></span>;
    }

    if (!user || role !== 'admin') {
        // navigate to forbidden page
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default AdminRoutes;
