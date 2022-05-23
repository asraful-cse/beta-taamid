import React from 'react';
import RatingReview from "../../Components/MyPoPage/PendingPoDetails/RatingReview/RatingReview";
import './ReviewPage.css'
import mailIcon from '../../SupplierComponents/images/reviewPage/mailIcon.png'
import printIcon from '../../SupplierComponents/images/reviewPage/printIcon.png'

const ReviewPage = () => {
    const reviews = [1,2,3,4]

// print function
    const   print = ()=>{
        window.print();
    }


    return (
        <>
            <div className='reviewAs'>
               <div className='d-flex justify-content-between'>
                   <h3 className='customMyPoTitle'>Reviews as Buyer</h3>
                   <div className='d-flex'>
                       <div className='roundedIcon1 roundedIcon2'>
                           <a  href="mailto:info@ewn-bd.com"><img className='mailPrintIcon' src={mailIcon} alt="mailPrintIcon1"/></a>
                       </div>
                      <div className='roundedIcon1 roundedIcon3'>
                          <img className='mailPrintIcon'  onClick={print} src={printIcon} alt="mailPrintIcon2"/>
                      </div>
                   </div>
               </div>
                <hr style={{margin: '0px'}}/>

                <body onload="window.print()" className='reviewAsBoxWrapper '>
                    {
                        reviews.map(review => <RatingReview review={review}> </RatingReview>)
                    }
                </body>
            </div>

            <div className='reviewAs'>
                <div className='d-flex justify-content-between'>
                    <h3 className='customMyPoTitle'>Reviews as Supplier</h3>
                    <div className='d-flex'>
                        <div className='roundedIcon1 roundedIcon2'>
                            <a href="mailto:info@ewn-bd.com"><img className='mailPrintIcon' src={mailIcon}
                                                                  alt="mailPrintIcon1"/></a>
                        </div>
                        <div className='roundedIcon1 roundedIcon3'>
                            <img className='mailPrintIcon' onClick={print} src={printIcon} alt="mailPrintIcon2"/>
                        </div>
                    </div>
                </div>
                <hr style={{margin: '0px'}}/>

                <body onLoad="window.print()" className='reviewAsBoxWrapper '>
                {
                    reviews.map(review => <RatingReview review={review}> </RatingReview>)
                }
                </body>
            </div>


        </>
    );
};

export default ReviewPage;