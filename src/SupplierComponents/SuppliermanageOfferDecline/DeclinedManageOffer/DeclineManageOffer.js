import React from 'react';
import crossIcon from "../../../images/icons/cross.png";
import './DeclineManageOffer.css'

const DeclineManageOffer = () => {
    return (
        <div className='declineMoCard' >
            <div  className='crossDiv'>
                <img  className='crossSign' src={crossIcon} alt="crossSign"/>
            </div>
            <p className='declineText declineSupMargin'>Sorry! Your offer has been declined!</p>

            <div className="modalFooter2">
                <button type="button" className=" cancelBtn" >Cancel</button>
                <button type="button" className="confirmBtn">Confirm</button>
            </div>

        </div>
    );
};

export default DeclineManageOffer;