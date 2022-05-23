import React, { useState } from "react";
import "./CreateNewPo.css";
import ItemCard from "../ItemCard/ItemCard";
import { useEffect } from "react";
import fileImg from "../../../images/registration/file.png";
import crossFile from "../../../images/fileIcons/crossFile.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ChangeAttachment,
  ChangeGeneralInfo,
  ChangeItemInfo,
  createNewPo,
  GetCategories,
} from "../_redux/Action";

const CreateNewPo = () => {
  const generalInfo = useSelector((state) => state.myPoInfo.generalInfo);
  const AttachmentData = useSelector((state) => state.myPoInfo.AttachmentData);
  const categoryData = useSelector((state) => state.myPoInfo.categoryData);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories());
  }, []);

  const handleChangePoInput = (name, value, event) => {
    dispatch(ChangeGeneralInfo(name, value));
  };
  const [itemData, setItemData] = useState([
    {
      title: "",
      description: "",
      quantity: "",
      subcategory: "",
      po: "",
    },
  ]);

  const handleChangePoItem = (name, value, index) => {
    let c = itemData;
    c[index][name] = value;
    // seta((d) => [...d, {name, value}])
    // dispatch(ChangeItemInfo(name, value));
    setItemData(c);
  };
  const handlePoSubmit = (generalInfo, AttachmentData, itemData) => {
    dispatch(createNewPo(generalInfo, AttachmentData, itemData));
  };

  const handleChangeFile = (name, value) => {
    dispatch(ChangeAttachment(name, value));
  };
  const [documents, setDocuments] = useState("");
  function handleFile(optionName, file) {
    setDocuments((currentDocuments) => {
      const newDocuments = { ...currentDocuments };

      newDocuments[optionName] = file;

      handleChangeFile(optionName, file);
      return newDocuments;
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [addItem, setAddItem] = useState(1);

  function addItemCard(event) {
    event.preventDefault();
    setItemData((d) => [
      ...d,
      {
        title: "",
        description: "",
        quantity: "",
        subcategory: "",
        po: "",
      },
    ]);
    setAddItem((prev) => prev + 1);
  }

  // filter each sub category from category

  const [categoryName, setCategoryName] = useState(1);

  let subCategory = [];
  if (categoryData) {
    subCategory = categoryData.filter((cat) => {
      if (cat.id == categoryName) return cat.sub_category;
    });
  }

  let subCategoryArray = [];
  if (subCategory.length > 0) {
    subCategoryArray = subCategory[0].sub_category;
  }

  //const d = new Date()
  // d.toLocaleDateString('pt-PT')

  // const [selectDate,setSelectDate]=useState('');

  // const handleDate=(e)=>{
  //   const date=e.target.value;
  //   const newDate = date.split("-");
  //   const yy= newDate[0];
  //   const mm=newDate[1];
  //   const dd=newDate[2];

  //   setSelectDate(dd+'/'+mm+'/'+yy);
  // }

  // console.log(selectDate);

  return (
    <>
      <div className="newPoWrapper">
        <div className="customLoginBox">
          <div className="boxBackground">
            <div>
              <h2 className="newPoTitle">{t("Create New PO")}</h2>
            </div>
            <hr />
            <h4 className="infoTitle">{t("General Information")}</h4>
            <div className="d-flex">
              <div>
                <label htmlFor="startDate" className="poFormBox1">
                  {t("PO Start Date")}
                </label>{" "}
                <br />
                <input
                  placeholder="dd/mm/yy"
                  type="date"
                  id="startDate"
                  name="startDate"
                  // value={selectDate.toString()}
                  className={`pe-3 fadeIn poDivideBox1 ${errors.start_date &&
                    "invalid"}`}
                  {...register("start_date", {
                    required: true,
                    onChange: (e) => {
                      handleChangePoInput("start_date", e.target.value);
                      // handleDate(e);
                    },
                  })}
                  onKeyUp={() => {
                    trigger("start_date");
                  }}
                />
              </div>
              <div>
                <label htmlFor="endDate" className="divideBox2label">
                  {t("PO End Date")}
                </label>
                <br />

                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  // value={CreatePoInfo.start_date}
                  className={`pe-3 fadeIn poDivideBox1 poDividedBox2 ${errors.endDate &&
                    "invalid"}`}
                  {...register("end_date", {
                    required: true,
                    onChange: (e) => {
                      handleChangePoInput("end_date", e.target.value);
                    },
                  })}
                  onKeyUp={() => {
                    trigger("end_date");
                  }}
                />
              </div>
            </div>
            <div className="d-flex">
              <div>
                <label htmlFor="email" className="poFormBox1">
                  {t("Payment Method")}
                </label>{" "}
                <br />
                <select
                  id="gen"
                  // value={CreatePoInfo.start_date}
                  className={`poDivideBox1 newPaymentInput ${errors.payment_method &&
                    "invalid"}`}
                  {...register("payment_method", {
                    required: true,
                    onChange: (e) => {
                      handleChangePoInput("payment_method", e.target.value);
                    },
                  })}
                  onKeyUp={() => {
                    trigger("payment_method");
                  }}
                >
                  <option value="1">{t("Cash")}</option>
                  <option value="2">Paypal</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="divideBox2label">
                  {t("Payment Grace Period")}
                </label>{" "}
                <br />
                <input
                  type="datetime-local"
                  id="gen"
                  name="payment_period"
                  placeholder="Eco focus"
                  // value={inputInfo.comp_name}
                  className={`pe-3 fadeIn poDivideBox1 poDividedBox2 ${errors.payment_period &&
                    "invalid"}`}
                  {...register("payment_period", {
                    required: true,

                    onChange: (e) => {
                      handleChangePoInput("payment_period", e.target.value);
                    },
                  })}
                  onKeyUp={() => {
                    trigger("payment_period");
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="poFormBox1 select-option">
                {t("Select Main Category")}
              </label>{" "}
              <br />
              <select
                id="gen"
                // value={CreatePoInfo.start_date}
                className={`poFormBox1 text-capitalize  newOptionInput ${errors.category &&
                  "invalid"}`}
                {...register("category", {
                  required: true,
                  onChange: (e) => {
                    handleChangePoInput("category", parseInt(e.target.value));
                    setCategoryName(parseInt(e.target.value));
                  },
                })}
                onKeyUp={() => {
                  trigger("category");
                }}
              >
                {/*<option value="1">Main Category</option>*/}
                {/*<option value="2">winter</option>*/}
                {/*<option value="3">working</option>*/}
                {/*<option value="4">road</option>*/}

                {categoryData &&
                  categoryData.map((cat, index) => (
                    <option className="text-capitalize" value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            {/*demo*/}
            <div>
              <label htmlFor="email" className="poFormBox1">
                {t("Title (This will be the main title of this PO)")}
              </label>{" "}
              <br />
              <input
                type="text"
                id="title"
                name="title"
                // value={CreatePoInfo.start_date}
                className={`ps-3 fadeIn newPoInput ${errors.title &&
                  "invalid"}`}
                {...register("title", {
                  required: true,
                  onChange: (e) => {
                    handleChangePoInput("title", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("title");
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="poFormBox1">
                {t("Description")}
              </label>{" "}
              <br />
              <textarea
                type="textarea"
                id="genTextArea"
                name="description"
                rows="4"
                cols="50"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                // value={CreatePoInfo.start_date}
                className={`fadeIn newPoTextArea p-3 ${errors.description &&
                  "invalid"}`}
                {...register("description", {
                  required: true,
                  onChange: (e) => {
                    handleChangePoInput("description", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("description");
                }}
              />
            </div>
            <div>
              <label htmlFor="deliveryPlace" className="poFormBox1">
                {t("Delivery place")}
              </label>{" "}
              <br />
              <input
                type="text"
                id="deliveryPlace"
                name="delivery_place"
                placeholder={t("Delivery place")}
                // value={CreatePoInfo.start_date}
                className={`ps-3 fadeIn newPoInput ${errors.delivery_place &&
                  "invalid"}`}
                {...register("delivery_place", {
                  required: true,
                  onChange: (e) => {
                    handleChangePoInput("delivery_place", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("delivery_place");
                }}
              />
            </div>
            <div className="col-sm-4"></div>
            <label htmlFor="deliveryPlace" className="poFormBox1">
              {t("Attachments (Optional)")}
            </label>{" "}
            <br />
            <div className="d-flex justify-content-center align-items-center imageLoaderBox">
              <div className="col-lg-4 fileArea">
                <input
                  onChange={(e) => {
                    handleFile("attachment", e.target.files[0]);
                  }}
                  type="file"
                  name="certificate1"
                  id="certificate1"
                  className="inputfile inputfile-1  .dividedBox1"
                  data-multiple-caption="{count} files selected"
                  multiple
                />
                <label htmlFor="certificate1">
                  <img src={fileImg} alt="" />
                  <span className="ml-2">{t("Upload file")}</span>
                </label>
              </div>

              <div className="col-lg-4 fileArea">
                <input
                  onChange={(e) => {
                    handleFile("attachment", e.target.files[0]);
                  }}
                  type="file"
                  name="certificate1"
                  id="certificate1"
                  class="inputfile inputfile-1  .dividedBox1"
                  data-multiple-caption="{count} files selected"
                  multiple
                />
                <label for="certificate1">
                  <img src={fileImg} alt="" />
                  <span className="ml-2">{t("Upload file")}</span>
                </label>
              </div>
              <div className="col-lg-4 fileArea">
                <input
                  onChange={(e) => {
                    handleFile("attachment", e.target.files[0]);
                  }}
                  type="file"
                  name="certificate1"
                  id="certificate1"
                  className="inputfile inputfile-1  .dividedBox1"
                  data-multiple-caption="{count} files selected"
                  multiple
                />
                <label htmlFor="certificate1">
                  <img src={fileImg} alt="" />
                  <span className="ml-2">{t("Upload file")}</span>
                </label>
              </div>
            </div>
          </div>

          {Array.from({ length: addItem }, (_unused, index) => index + 1).map(
            (itemIndex) => {
              const itemId = `${itemIndex}`;
              return (
                <div key={itemId}>
                  <div className="itemCard">
                    <div className="customLoginBox">
                      {/* <hr style={{border: "1px solid #E6E8EC"}}/> */}
                      <h4 className="infoTitle">
                        {t("Item No.")} {itemId}
                      </h4>

                      <form className="newPoForm">
                        <div>
                          <label htmlFor="email" className="poFormBox1">
                            {t("Item Name")}
                          </label>{" "}
                          <br />
                          <input
                            type="text"
                            id="title2"
                            name={`title${itemId + 1}`}
                            className={`ps-3 fadeIn newPoInput ${errors.name &&
                              "invalid"}`}
                            {...register(`title${itemId + 1}`, {
                              required: true,
                              onChange: (e) => {
                                handleChangePoItem(
                                  "title",
                                  e.target.value,
                                  itemId - 1
                                );
                              },
                            })}
                            onKeyUp={() => {
                              trigger(`title${itemId + 1}`);
                            }}
                          />
                        </div>
                        <div className="d-flex">
                          <div>
                            <label htmlFor="email" className="poFormBox1">
                              {t("Subcategory")}
                            </label>{" "}
                            <br />
                            <select
                              id="gen"
                              name={`subcategory${itemId + 1}`}
                              // value={CreatePoInfo.start_date}
                              className={`poDivideBox1  newPaymentInput ${errors.category &&
                                "invalid"} text-capitalize`}
                              {...register(`subcategory${itemId + 1}`, {
                                required: true,
                                onChange: (e) => {
                                  handleChangePoItem(
                                    "subcategory",
                                    e.target.value,
                                    itemId - 1
                                  );
                                },
                              })}
                              onKeyUp={() => {
                                trigger(`subcategory${itemId + 1}`);
                              }}
                            >
                              {subCategoryArray &&
                                subCategoryArray.map((subCat) => (
                                  <option
                                    className="text-capitalize"
                                    value={subCat.id}
                                  >
                                    {subCat.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="email" className="divideBox2label">
                              {t("Quantity")}
                            </label>{" "}
                            <br />
                            <input
                              type="number"
                              id="quantity"
                              name={`quantity${itemId + 1}`}
                              className={`ps-3 fadeIn poDivideBox1 poDividedBox2 ${errors[
                                `quantity${itemId + 1}`
                              ] && "invalid"}`}
                              {...register(`quantity${itemId + 1}`, {
                                required: true,
                                onChange: (e) => {
                                  handleChangePoItem(
                                    "quantity",
                                    e.target.value,
                                    itemId - 1
                                  );
                                },
                              })}
                              onKeyUp={() => {
                                trigger(`quantity${itemId + 1}`);
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="poFormBox1">
                            {t("Description")}
                          </label>{" "}
                          <br />
                          <input
                            rows="4"
                            cols="50"
                            type="textarea"
                            id="genTextArea"
                            name={`description${itemId + 1}`}
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            // value={CreatePoInfo.start_date}
                            className={`fadeIn newPoTextArea  ${errors.description2 &&
                              "invalid"}`}
                            {...register(`description${itemId + 1}`, {
                              required: true,
                              onChange: (e) => {
                                handleChangePoItem(
                                  "description",
                                  e.target.value,
                                  itemId - 1
                                );
                              },
                            })}
                            onKeyUp={() => {
                              trigger(`description${itemId + 1}`);
                            }}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              );
            }
          )}

          <div>
            <h4 className="addItmTitle" onClick={addItemCard}>
              {t("Add new item")}
            </h4>
            <div className="resetBtn">
              <button
                className="backBtn"
                onClick={() => window.location.reload(false)}
              >
                {t("Reset")}
              </button>
              <button
                onClick={(e) => {
                  handlePoSubmit(generalInfo, AttachmentData, itemData);
                }}
                className="completeBtn"
              >
                {t("Submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewPo;
