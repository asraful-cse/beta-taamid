import React from 'react';
import crossIcon from "../../../images/icons/cross.png";

const CancelledOfferBox = () => {
    return (
        <div className='declineExpiredCard' >
            <div  className='crossDiv'>
                <img  className='crossSign' src={crossIcon} alt="crossSign"/>
            </div>
            <p className='declineText'>This offer has been Canceled!</p>

        </div>
    );
};

export default CancelledOfferBox;