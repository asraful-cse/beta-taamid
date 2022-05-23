import React from 'react';
import acceptedSign from "../../images/modal/congratsTick.png";
import RatingReview from "../../../Components/MyPoPage/PendingPoDetails/RatingReview/RatingReview";

const CompletedOrdersWithReviews = () => {
    const reviews = [1,2]
    return (
        <div className='declineExpiredCard' >
            <p className='acceptedSign'><img src={acceptedSign} alt="acceptedSign"/></p>
            <p className='declineText'>ORDER COMPLETED!</p>
            <hr style={{border: '1px solid #E6E8EC', margin: '30px 0 0 0 '}}/>

            <body onLoad="window.print()" className='reviewAsBoxWrapper '>
            {
                reviews.map(review => <RatingReview review={review}> </RatingReview>)
            }
            </body>

        </div>
    );
};

export default CompletedOrdersWithReviews;