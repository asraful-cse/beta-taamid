import React, {useEffect, useState} from "react";
import DeleteUser from "./DeleteUser/DeleteUser";
import { useDispatch, useSelector } from "react-redux";

import "./ManageUserList.css";
import deleteBtn from "../../../../images/people/deleteBtn.png";
import {deleteInvitedUser, GetInvitedUserData} from "../_redux/Action";
import congratsTick from "../../../../SupplierComponents/images/modal/congratsTick.png";
import {Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ManageUsersList = ({props}) => {
  const { t } = useTranslation();
  const invitedUserInfo = useSelector(
    (state) => state.myPoInfo.invitedUserData
  );
  const [userId,setUserId]=useState('');

  

  // dispatching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInvitedUserData());
  }, []);

  // delete
  //handle details page delete

  const handleDeleteInvitedUser = (user_id) => {

    console.log ('handle delete', user_id)
    dispatch(deleteInvitedUser(user_id));
  }
  const orders = [1, 2, 3, 4, 5];

  const statusBtnStyles = {
    color: "#2B3990",
  };

  if ("status" === "Pending") {
    statusBtnStyles.background = "#FFE3E3";
    statusBtnStyles.color = "#FF4545";
  } else if ("status" === "On Going") {
    statusBtnStyles.background = "#ffe5c7";
    statusBtnStyles.color = "#FFBD3E";
  } else if ("status" === "Completed") {
    statusBtnStyles.background = "#C6FFE0";
    statusBtnStyles.color = "#009444";
  }

  const [show, setShow] = useState(false);
  const [callApi, setCallApi] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
console.log('id', id)
    setShow(true)

  };

  return (
    <div className="history_Container">
      <h1 className="Header_list">{t("Manage Users")} </h1>
      <div className="historyList" style={{ overflowX: "auto" }}>
        <table className="table" id="historyChart">
          <thead className="custThread">
            <tr className="customTr">
              <th scope="col">{t("User Email")}</th>
              <th scope="col">{t("Role")}</th>
              <th scope="col">{t("Status")}</th>
              <th scope="col">{t("Action")}</th>
            </tr>
          </thead>
          <tbody className="customTBody">
            {invitedUserInfo &&
              invitedUserInfo.map((user, index) => (
                <tr key={index} className="customTr">
                  <td>{user.email}</td>

                  {user.current_role === 1 ? (
                    <td>{t("Super User")}</td>
                  ) : user.current_role === 2 ? (
                    <td>{t("Requester")}</td>
                  ) : (
                    <td>{t("Supplier")}</td>

                  )}
                  {user.isActive ? <td>{t("Active")}</td> : <td>{t("Pending")}</td>}

                 <td>
                   <button type="button" onClick={()=>handleShow(user?.user_id)}>
                     <img src={deleteBtn} alt="deleteBtn"/>
                   </button>
                 </td>

                </tr>
        
              ))}
          </tbody>
        </table>
      </div>

      {userId && 
      
        <Modal  {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered  show={show} onHide={handleClose} animation={false}>
          <Modal.Body>
            <div className="modalBody">
            <p className='reqPara'>Do you want to Delete this user? You can’t able to undo
              this if you confirm.</p>
          </div>
          {/* user.user_id */}
            <div className="modalFooter2">
              <button type="button" className=" cancelBtn"  onClick={handleClose}>Cancel</button>
              <button type="button"  className="confirmBtn"onClick={function(event){  handleDeleteInvitedUser (userId); handleClose()}} >Confirm</button>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
};

export default ManageUsersList;
