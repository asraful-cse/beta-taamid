import React from "react";
import ContactForm from "./ContactForm/ContactForm";
import AddressBox from "./AddressBox/AddressBox";
import Map from "./Map/Map";
import "./AddressBox/AddressBox.css";
import { useTranslation } from 'react-i18next';
const ContactPage = () => {
  const { t } = useTranslation();
  window.scroll({
    top: 100,
    left: 100,
    behavior: "smooth",
  });
  return (
    <div className="d-flex justify-content-center">
      <div className="row container">
        <h2 className="contactHeading mt-4 mb-3">{t("Contact Us")}</h2>

        <div className="col-12 col-md-4">
          <AddressBox ></AddressBox>
          <Map></Map>
        </div>
        <div className="col-12 col-md-8 mt-4 mt-md-0">
          <ContactForm></ContactForm>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
