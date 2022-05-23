import React from 'react';
import RatingReviewForm from "../../../Components/MyPoPage/CompletedPoDetails/RatingReviewForm/RatingReviewForm";
import acceptedSign from "../../images/modal/congratsTick.png";

const CompletedOrdersWithRating = () => {
    return (

        <div className='declineExpiredCard' >
            {/* <p className='acceptedSign'><img src={acceptedSign} alt="acceptedSign" /></p>
            <p className='declineText'>Good News! Your offer has been accepted!</p>
            <hr style={{ border: '1px solid #E6E8EC', margin: '40px' }} /> */}
            <RatingReviewForm />
        </div>
    );
};

export default CompletedOrdersWithRating;