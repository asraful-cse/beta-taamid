import React from 'react';
import './DeclineCard.css'
import crossIcon from '../../../../../images/icons/cross.png'

const DeclineCard = () => {
    return (
        <div className='declineExpiredCard' >
            <div  className='crossDiv'>
                <img  className='crossSign' src={crossIcon} alt="crossSign"/>
            </div>
            <p className='declineText'>This offer has been declined!</p>

        </div>
    );
};

export default DeclineCard;