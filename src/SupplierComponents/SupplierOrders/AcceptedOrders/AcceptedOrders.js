import React from 'react';
import './AcceptedOrder.css'
import acceptedSign from '../../images/modal/congratsTick.png'

const AcceptedOrders = () => {
    return (
        <div className='declineExpiredCard' >
            <p className='acceptedSign'><img src={acceptedSign} alt="acceptedSign"/></p>
            <p className='declineText'>Good News! Your offer has been accepted!</p>

        </div>
    );
};

export default AcceptedOrders;