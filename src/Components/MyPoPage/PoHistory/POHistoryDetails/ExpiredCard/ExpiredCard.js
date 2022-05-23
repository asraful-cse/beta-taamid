import React from 'react';
import crossIcon from "../../../../../images/icons/cross.png";

const ExpiredCard = () => {
    return (
    <div className='declineExpiredCard' >
        <div  className='crossDiv'>
            <img  className='crossSign' src={crossIcon} alt="crossSign"/>
        </div>
        <p className='declineText'>This PO has been Expired!</p>

    </div>
    );
};

export default ExpiredCard;