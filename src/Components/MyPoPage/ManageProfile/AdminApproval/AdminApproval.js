import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './AdminApproval.css'
import { useTranslation } from "react-i18next";
const AdminApproval = ({handleClose,show}) => {
    const { t } = useTranslation();
    return (


     <Modal show={show} onHide={handleClose}  animation={false} centered>
        
                 <div className="modal-content modalContent modalCard">
                        <div className="modalHeader ">
                            <h5 className="modalTitle" id="exampleModalLabel">{t("Request Submitted")}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">

                            </button>
                        </div>
                        <div className="modalBody">
                            <p className='reqPara'>{t("Your profile updates are submitted for review. Please wait for the approval.")} </p>
                        </div>
                        <div className="modalFooter">
                        <Button className=" closeBtn"  onClick={handleClose}>
                        {t("Close")}
                        </Button>
                        </div>
                    </div>
      </Modal>

    );
};

export default AdminApproval;