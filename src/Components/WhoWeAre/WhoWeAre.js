import React from "react";
import "./WhoWeAre.css";
import { useTranslation } from "react-i18next";
const WhoWeAre = () => {
  const { t } = useTranslation();
  window.scroll({
    top: 100,
    left: 100,
    behavior: 'smooth'
  });
  return (
    <div  className="container">
      <h3 className="whoHeader paddingForDisclaimer  " id="who">{t("Who We Are")}</h3>
      <div className="pendingItemBoxCard">
        <div className="d-flex flex-row whoSection">
          <button>
            <img
              src="http://propeller.in/components/list/img/40x40.png"
              className="avatar2"
              width="40"
              alt="avatar"
              height="40"
              circle
            />
          </button>
          <div className="verticleLine">
            <span className="cardTitle whoTitle " style={{ color: " #23262F" }}>
              Arlene McCoy
            </span>{" "}
            <br />
            <span className=" whoSubtitle" style={{ color: " #23262F" }}>
              Riyadh
            </span>
          </div>
        </div>
        <br />
        <p className="singleItemSubTitle2 marginForDisclaimer">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <br />
          <br />
        </p>
        <p className="singleItemSubTitle2 marginForDisclaimer">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <br />
          <br />
        </p>
        <h5 className="subHeaderWho"> What see what you do</h5>
        <p className="singleItemSubTitle2 marginForDisclaimer">
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
          <br />
          <br />
        </p>
        <h5 className="subHeaderWho"> What see what you do</h5>
        <p className="singleItemSubTitle2 marginForDisclaimer">
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
          <br />
          <br />
        </p>
        <h5 className="subHeaderWho"> What see what you do</h5>
        <p className="singleItemSubTitle2 marginForDisclaimer">
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
          <br />
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
          <br />
          <br />
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that.
          <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default WhoWeAre;
