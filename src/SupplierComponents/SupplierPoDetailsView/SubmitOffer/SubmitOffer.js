import React from 'react';
import closeSquare from "../../images/stamp/closeSquare.png";
import '../UploadStamp/UploadStamp.css';

const SubmitOffer = () => {
    return (
        <>

            <div className="modal fade " id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel3"
                 aria-hidden="true">
                <div className="modal-dialog " role="document">
                    <div className="modal-content modalContent modalCard">
                        <div className="modalHeader ">
                            <h5 className="modalTitle" id="exampleModalLabel3">Request Submitted</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">

                            </button>
                        </div>
                        <div className="modalBody">
                            <p className='reqPara'>Your profile updates are submitted for review. Please wait for the approval. </p>
                        </div>
                        <div className="modalFooter">
                            <button type="button" className=" closeBtn"  data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubmitOffer;