import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useBuyer from '../../hooks/useBuyer';
import useSeller from '../../hooks/useSeller';
import useTitle from '../../hooks/useTitle';
import AllBuyers from './AllBuyers';
import MyOrders from './MyOrders';
import MyProducts from './MyProducts';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    useTitle('Dashboard');
    // console.log(isAdmin, isSeller, isBuyer);
    return (
        <>
            {isAdmin && <AllBuyers />}
            {isSeller && <MyProducts />}
            {isBuyer && <MyOrders />}
        </>
    );
};

export default Dashboard;