import React, {useEffect} from 'react';
import './AddressBox.css'
import {useDispatch, useSelector} from "react-redux";
import {getContact} from "../_redux/Action";
import { useTranslation } from 'react-i18next';
const AddressBox = () => {
    const { t } = useTranslation();
    const getContactInfo = useSelector ((state) => state.contactInfo.contactData);

    const dispatch = useDispatch ();

    useEffect (() => {
        dispatch (getContact ());
    }, []);

    return (
        <>
            {getContactInfo &&
            <div className='contactAddressBox'>
                <h4 className='addressHeading mb-0'>{t("Head Office")}</h4>
                <h6 className='adressTitle'>{t("Address")}</h6>
                <p className='addressText mb-0'>{getContactInfo[0].address}</p>

                <h6 className='adressTitle'>{t("Phone")}</h6>
                <p className='addressText mb-0'>{getContactInfo[0].phone}
                </p>

                <h6 className='adressTitle'>{t("Email")}</h6>
                <p className='addressText mb-0'>{getContactInfo[0].email}</p>

            </div>
            }
        </>
    );
};

export default AddressBox;