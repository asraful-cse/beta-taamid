import React from "react";
import "./Disclaimer.css";
import { useTranslation } from "react-i18next";
const Disclaimer = () => {
  const { t } = useTranslation();
  
  window.scroll({
    top: 100,
    left: 100,
    behavior: "smooth",
  });
  return (
    <div className="container" id="disclaimerLink">
      <h3 className=" disclaimerTitle paddingForDisclaimer">{t("Disclaimer")}</h3>
      <div className="pendingItemBoxCard">
        <h4 className=" InfoDisclamer paddingForDisclaimer">
          Lorem Ipsum is simply dummy
        </h4>
        <p className="singleItemSubTitle singleItemSubTitle2 marginForDisclaimer">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <br />
          <br />
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
          <br />
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
        </p>
        <br />
        <h4 className=" InfoDisclamer paddingForDisclaimer">
          Lorem Ipsum is simply dummy
        </h4>
        <p className="singleItemSubTitle singleItemSubTitle2 marginForDisclaimer">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <br />
          <br />
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
          <br />
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
        </p>
        <br />
        <h4 className=" InfoDisclamer paddingForDisclaimer">
          Lorem Ipsum is simply dummy
        </h4>
        <p className="singleItemSubTitle singleItemSubTitle2 marginForDisclaimer">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <br />
          <br />
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
          <br />
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
          <br />
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <br />
          <br />
          It was popularised in the 1960s with the release of Letraset sheets.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
