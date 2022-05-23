import React, { useEffect, useState } from "react";
import fileImg from "../../images/fileIcons/fileIcon.png";
import crossFile from "../../images/fileIcons/crossFile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeOfferInfo,
  deleteOfferInfo,
} from "../../Components/MyPoPage/_redux/Action";
import { showToast } from "../../utils/ToastHelper";

const ToggoleComponent = ({
  item,
  index,
  increaseOfferCount,
  decreaseOfferCount,
  offerCount,
  setItemData,
  setItemTaken,
  itemTaken,
  itemData,
  error,
  setError,
}) => {
  const dispatch = useDispatch();
  let offerData = useSelector((state) => state.myPoInfo.offerData);

  //   const handleChangePoInput = (name, value, index) => {
  //     let c = itemData;

  //     c[index][name] = value;
  //     setItemData(c);

  //     console.log("=======>c", c);
  //   };
  // const [idx, setIdx] = useState(0)

  const handleChangeOfferInput = (name, value) => {
    dispatch(ChangeOfferInfo(name, value));
  };

  const [show, setShow] = useState(false);
  const [documents, setDocuments] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unit_price, setUnitunit_price] = useState("");
  const [total_price, setTotal_price] = useState(0);
  const [attachment, setAttachment] = useState("");

  

  console.log(documents);
  if (!title) {
    setError(true);
  }
  const getTotalPrice = (value) => {
    setTotal_price(value.target.value);

    setItemData(itemData);
  };
  const getUnitPrice = (value) => {
    setUnitunit_price(value.target.value);
    let total_price_damp = parseInt(value.target.value) * item.quantity;

    setTotal_price(total_price_damp);

    setItemData(itemData);
  };
  const handleShow = (event) => {
    if (event.target.checked) {
      setItemData((data) => [
        ...data,
        {
          title,
          description,
          unit_price,
          total_price,
          attachment,
          po_item: item.id,
        },
      ]);
      setItemTaken((data) => [...data, index]);
    } else {
      let itemDiv = itemTaken;
      let idx = itemDiv.indexOf(index);
      itemDiv.splice(idx, 1);
      setItemTaken(itemDiv);

      let itemDT = itemData;
      itemDT.splice(idx, 1);
      setItemData(itemDT);

      // START FROM HERE
      setTitle("");
      setDescription("");
      setUnitunit_price("");
      setTotal_price("");
      setAttachment("");
    }
    // console.log("event.target.value", event.target.checked);
    // event.target.checked ? increaseOfferCount() : decreaseOfferCount();
    // delete offerData[`title${index + 1}`];
    // deleteOfferInfo(offerData);

    setShow((prev) => !prev);
  };

  useEffect(() => {
    let itemDiv = itemTaken;
    let idx = itemDiv.indexOf(index);
    if (idx >= 0) {
      let itemDT = itemData;
      itemDT[idx] = {
        title,
        description,
        unit_price,
        total_price,
        attachment,
        po_item: item.id,
      };
      setItemData(itemDT);
    }
  }, [
    title,
    description,
    unit_price,
    total_price,
    attachment,
    itemTaken,
    index,
    itemData,
    item.id,
    setItemData,
  ]);

  const [fileName, setFileName] = useState("");
  function handleFile(optionName, file) {
    // console.log('file',file.name);
    setFileName(file?.name || "");

    setDocuments((currentDocuments) => {
      const newDocuments = { ...currentDocuments };

      newDocuments[optionName] = file;
      setAttachment(file);
      // handleChangeOfferInput(optionName, file);
      return newDocuments;
    });
  }

  return (
    <>
      <div
        className={` ${show ? "customBorderGreen" : "supplierPoDetailsCard"}`}
      >
        <div className="d-flex">
          <div className="checkBoxPosition d-flex justify-content-center align-items-center border-1 border-end ">
            <input
              className="styledCheckbox custom_checkbox"
              id={item.id}
              type="checkbox"
              value="new"
              onClick={(e) => handleShow(e)}
            />
            <label htmlFor={item.id}> </label>
          </div>
          <div>
            <div className="justify-content-between">
              <h3
                className="PoBoxTitle text-capitalize"
                style={{ marginLeft: "20px" }}
              >
                {item.title}
              </h3>
              <p className="singleItemSubTitle">{item.description}</p>
            </div>
            <div className="pendingPoUl">
              <ul>
                <li>
                  <span
                    className="itemTitle "
                    style={{
                      fontWeight: "bold",
                      marginRight: "0",
                    }}
                  >
                    Quantity -
                  </span>{" "}
                  <span className="poItemQuant">{item.quantity}</span>
                </li>
              </ul>
            </div>
            <div className="cardBoxBody d-flex ms-3">
              <button className="singleItemNameBox mb-3">
                {item.subcategory}
              </button>
            </div>
          </div>
        </div>
      </div>

      {show && (
        <div className="">
          <div className="d-flex flex-column flex-md-row mb-3 mb-md-0">
            <div className="eachNameBox d-flex eachNameBox1">
              <div>
                <p className="nameTitleDetail mb-0 h-100">Name </p>
              </div>

              <div className="nameDesc d-flex align-items-center bg-white w-100 h-100 input_field">
                <input
                  placeholder="e.g. 2.4G Wireless Mouse FG35"
                  className="listItme_input h-100"
                  type="text"
                  name={`title${offerCount}`}
                  id="title_offer"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="ms-0 ms-md-2  eachNameBox1 eachBoxMarginLeft inputBoxBorder inputCustomMargin singleInputFile bg-white d-flex justify-content-around align-items-center pt-0">
              <label className=" d-flex justify-content-center align-items-center">
                <input
                  accept="*"
                  multiple={false}
                  name={`attachment${offerCount}`}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleFile(e.target.name, e.target.files[0]);
                  }}
                />
                {!fileName && <img src={fileImg} alt="fileImg" />}
                <span className="ml-2">{fileName || "Upload File"}</span>
              </label>

              {fileName && (
                <div>
                  <img
                    src={crossFile}
                    alt="'crossFile'"
                    className="crossFile"
                    onClick={() => {
                      handleFile(1, null);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="eachNameBox d-flex eachNameBoxWidth">
            <div>
              <p className="nameTitleDetail mb-0 h-100">Description </p>
            </div>

            <div className="nameDesc d-flex align-items-center bg-white w-100 h-100  input_field">
              <input
                required
                placeholder="Write a short description about product"
                className="listItme_input"
                rows="4"
                cols="50"
                type="textarea"
                id="description_offer"
                name={`description${offerCount}`}
                onChange={(e) =>
                  //   handleChangeOfferInput(e.target.name, e.target.value)
                  setDescription(e.target.value)
                }
              />
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row">
            <div className="eachNameBox d-flex  eachNameBox1">
              <div>
                <p className="nameTitleDetail mb-0 h-100">Unit Price </p>
              </div>

              <div className="nameDesc d-flex align-items-center bg-white w-100 h-100 input_field">
                SR{" "}
                <input
                  placeholder="100"
                  className="listItme_input"
                  name={`unit_price${offerCount}`}
                  type="number"
                  id=""
                  value={unit_price}
                  onChange={getUnitPrice}
                />
              </div>
            </div>
            <div className="ms-md-2 ms-0 eachNameBox d-flex eachNameBox1 eachBoxMarginLeft">
              <div>
                <p className="nameTitleDetail mb-0">Total Price </p>
              </div>

              <div className="nameDesc d-flex align-items-center bg-white w-100 h-100  input_field">
                SR{" "}
                <input
                  placeholder="100"
                  className="listItme_input"
                  name={`total_price${offerCount}`}
                  type="number"
                  id=""
                  value={total_price}
                  onChange={getTotalPrice}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToggoleComponent;
