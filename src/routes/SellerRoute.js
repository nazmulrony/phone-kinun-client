import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AuthContext } from '../contexts/AuthProvider';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    if (loading || isSellerLoading) {
        return <div className='h-[80vh]'>
            {<Spinner />}
        </div>
    }
    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/'></Navigate>
};

export default SellerRoute;