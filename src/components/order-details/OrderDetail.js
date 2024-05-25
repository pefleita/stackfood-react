import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import OrderDetails from './OrderDetails';
import PushNotificationLayout from "../PushNotificationLayout";
import { useSelector } from "react-redux";
import CustomContainer from '../container';

const OrderDetail = ({orderId}) => {
    const { guestUserInfo } = useSelector((state) => state.guestUserInfo);

    return (
        <PushNotificationLayout>
            <OrderDetails phone={guestUserInfo?.contact_person_number} OrderIdDigital={orderId}/>
        </PushNotificationLayout>
    );
};

export default OrderDetail;