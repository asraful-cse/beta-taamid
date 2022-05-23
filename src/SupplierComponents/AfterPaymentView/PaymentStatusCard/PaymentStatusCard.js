import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import congratsTick from "../../images/modal/congratsTick.png";
import failedImg from "../../images/modal/cancel.png";
import {Link, useParams} from "react-router-dom";
import {postPaymentData} from "../../_redux/Action";
import {useDispatch, useSelector} from "react-redux";
import {getMyPoList, GetPaymentVerification, singlePoDetailsDelete} from "../../../Components/MyPoPage/_redux/Action";
import loginReducer from "../../../Components/LoginRegistration/Login/_redux/Reducer";
import './PaymentStatusCard.css'

const PaymentStatusCard = () => {
    const [show, setShow] = useState(true);
    const [callApi, setCallApi] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // payment verify data
    const paymentVerificationData = useSelector(
        (state) => state.myPoInfo.paymentVerificationData
    );

    console.log('paymentVerificationData', paymentVerificationData)

    const {id,cartId} = useParams()
    console.log('Id',id, 'cartId2',cartId)


    const dispatch = useDispatch()
    const delay = 5;
    // New Paymant Verification
   const offerId= localStorage.getItem('offer_id');
   const tranId= localStorage.getItem('tran_ref');



    useEffect(
        () => {
    
            dispatch(GetPaymentVerification(offerId,tranId))
         


        },

        []
    );


    // const handleReturnPageAfterPayment = (cartId) => {
    //     setTimeout(function () {
    //         document.getElementById('link_page').onclick();
    //     }, 5 * 60 * 1000);
    //     dispatch(GetPaymentVerification(cartId));
    //     console.log('verified')
    //
    // }


    return (offerId&&tranId&&paymentVerificationData!==null) ? (
        <>
            {
                paymentVerificationData && paymentVerificationData.payment_result.response_status == 'A' ?
                   
                   (
                        <Modal
                        show={show}
                        onHide={handleClose}
                        animation={false}

                        contentClassName=" modalContainer"


                        // size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                            <div className="modal-width">

                            <div className='congratsModalTick'>
                            <img src={congratsTick} alt="congratsTick"/>
                            </div>
                            <div>
                            <h2 className="congratsModalTitle">Congratulations!</h2>
                            <p className='paymentPara'>Your payment for PO has been completed.</p>
                            </div>

                            <form >

                            <div>
                            <p className='customPaymentText'>We’ve sent you an email with all the
                            details of your order <br/>
                            & remember you can track your order using this app. </p>
                            <h3 className='congratsModalTitle'>Order ID</h3>
                            <h5 className='paymentPara customIdMargin'>#{paymentVerificationData.cart_id}</h5>
                            </div>

                            <div className='updateBtnForAttachment'>
                            <Link to='/supplierManageOffer'>
                            <button
                                type="button"
                                className="completeBtn modalProceedMargin"
                                data-dismiss="modal"
                                aria-label="Close"

                            >
                                Continue
                            </button>
                            </Link>
                            </div>
                            </form>
                            </div>
                        </Modal>
                    )
                    :
                    (
                        <Modal
                        show={show}
                        onHide={handleClose}
                        animation={false}
                        
                        contentClassName=" modalContainer"
                        
                  
                        // size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                          <div className="modal-width">
                  
                          <div className='congratsModalTick'>
                              <img src={failedImg} alt="congratsTick" width={80} height={80}/>
                          </div>
                          <div>
                              <h2 className="paymentFailed">Payment Failed</h2>
                              <p className='paymentPara'>Your payment process hasn’t been completed</p>
                          </div>
                  
                          <form >
                  
                              <div className='updateBtnForAttachment'>
                                  <button
                                      type="button"
                                      className="completeBtn modalProceedMargin"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                      onClick={() => handleClose()}
                                  >
                                      Go Back
                                  </button>
                              </div>
                          </form>
                          </div>
                        </Modal>)
            }
        </>
    ) : (

        <Modal show={show} onHide={handleClose} animation={false}
             
        contentClassName=""
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <div >
                <div className=" bg-white p-4 text-center">
                    <h3>Loading...</h3>
                </div>
            </div>
        </Modal>

    );
}


export default PaymentStatusCard;