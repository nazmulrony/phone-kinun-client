import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    if (loading || isAdminLoading) {
        return <div className='h-[80vh]'>
            {<Spinner />}
        </div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/'></Navigate>
};

export default AdminRoute;