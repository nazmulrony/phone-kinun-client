import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AuthContext } from '../contexts/AuthProvider';
import useBuyer from '../hooks/useBuyer';

const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    if (loading || isBuyerLoading) {
        return <div className='h-[80vh]'>
            {<Spinner />}
        </div>
    }
    if (user && isBuyer) {
        return children;
    }
    return <Navigate to='/'></Navigate>
};

export default BuyerRoute;