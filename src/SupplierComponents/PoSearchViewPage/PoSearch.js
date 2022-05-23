import React, { useCallback, useEffect, useState } from "react";
import "./Posearch.css";
import listview from "../../images/myPo/listView.png";
import gridView from "../../images/myPo/gridView.png";
import emptyList from "../../images/myPo/emptyList.png";
import filledGrid from "../../images/myPo/filledGrid.png";
import closeSquare from "../../images/icons/Close Square.png";
import Box from "../po/Box";
import PoCard from "../../Components/LandingPage/PoCard/PoCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import isEmpty from "../../utils/isEmpty";

const allStatus = [
  { id: "dfa1772c-cf81-11ec-9d64-0242ac120002", label: "New", value: 1 },
  {
    id: "09f630db-8e4e-4f6f-b3b3-971f1cacf518",
    label: "In Progress",
    value: 2,
  },
  { id: "779303a2-e1f9-439f-afff-771a1a20fafe", label: "Completed", value: 3 },
];

const PoSearch = () => {
  const [loading, loadingSet] = useState(false);
  const [error, errorSet] = useState(false);
  const [dataByCategory, dataByCategorySet] = useState([]);
  const [filteredItems, filteredItemsSet] = useState([]);
  const [allCities, allCitiesSet] = useState([]);
  const [checkCities, checkCitiesSet] = useState([]);
  const [currentView, setCurrentView] = useState("grid");

  const { catId } = useParams();

  const getPOByCategory = async (id) => {
    const apiEndPoint = process.env.API_URL || "https://dev.taamid.com/api";

    try {
      errorSet("");
      loadingSet(true);

      const response = await axios.get(`${apiEndPoint}/polist?category=${id}`);

      if (response.data?.purchase_order_list) {
        loadingSet(false);
        dataByCategorySet(response.data?.purchase_order_list);
        filteredItemsSet(response.data?.purchase_order_list);
      }

      if (isEmpty(response.data?.purchase_order_list)) {
        loadingSet(false);
        dataByCategorySet([]);
        errorSet(`Category does not have any items!`);
      }
    } catch (error) {
      loadingSet(false);
      errorSet(`Could not find any item in this category`);
    }
  };

  const updateFilteredItems = useCallback(
    (key = "", value = "") => {
      errorSet("");
      if (key) {
        filteredItemsSet(dataByCategory);
        if (typeof value === "number") {
          filteredItemsSet((prevItems) =>
            prevItems.filter((item) => item[key] === value)
          );
        } else {
          filteredItemsSet((prevItems) =>
            prevItems.filter((item) => checkCities.includes(item[key]))
          );
        }
      } else {
        filteredItemsSet(dataByCategory);
      }
    },
    [checkCities, dataByCategory]
  );

  const updateCategoryDataByStatus = (event) =>
    updateFilteredItems("status", parseInt(event.target.value, 10));

  const updateCategoryDataByCity = (event) => {
    if (event.target.checked) {
      checkCitiesSet((prevCities) => [...prevCities, event.target.value]);
    } else {
      checkCitiesSet((prevCities) =>
        prevCities.filter((city) => city !== event.target.value)
      );
    }
  };

  const handleListView = useCallback(() => {
    setCurrentView("grid");
  }, []);

  const handleCurrentView = useCallback(() => {
    setCurrentView("list");
  }, []);

  const resetAll = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    getPOByCategory(catId);
  }, [catId]);

  useEffect(() => {
    if (dataByCategory) {
      allCitiesSet([
        ...new Set(dataByCategory.map((item) => item.delivery_place)),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataByCategory]);

  useEffect(() => {
    if (checkCities?.length) {
      updateFilteredItems("delivery_place");
    } else {
      updateFilteredItems();
    }
  }, [checkCities, updateFilteredItems]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <p className="filter">
            <strong>Filters</strong>
          </p>

          {/* Filter By Status */}
          <div className="status">
            <p className="category_title fs-5">Status</p>
            {allStatus.map((status) => (
              <div className="form-check mt-2" key={status.id}>
                <input
                  className="styled-checkbox custom_checkbox"
                  type="radio"
                  name="status"
                  id={status.label}
                  value={status.value}
                  onChange={updateCategoryDataByStatus}
                />
                <label className="text-capitalize" htmlFor={status.label}>
                  {status.label}
                </label>
              </div>
            ))}
          </div>

          {/* Filter By City */}
          <div className="allCity">
            <p className="category_title fs-5">Cities</p>
            {allCities.map((city) => (
              <div className="form-check mt-2" key={city}>
                <input
                  className="styled-checkbox custom_checkbox"
                  type="checkbox"
                  name="city"
                  id={city}
                  value={city}
                  onChange={updateCategoryDataByCity}
                />
                <label className="text-capitalize" htmlFor={city}>
                  {city}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-sm-9">
          <div className="d-flex align-items-center justify-content-between searchNav">
            <>
              <p className="poSearch_title">
                {dataByCategory.length || 0} P0's available
              </p>

              <div className="d-flex">
                <button
                  type="button"
                  className="btn d-flex justify-content-center align-items-center"
                  onClick={resetAll}
                >
                  <p className="clearAll">CLEAR ALL FILTERS</p>
                  <img
                    src={closeSquare}
                    alt="closeSquare2"
                    style={{
                      height: "20px",
                      width: "20px",
                      marginLeft: "-15px",
                    }}
                  />
                </button>

                {currentView === "grid" ? (
                  <>
                    <img
                      className="customList"
                      onClick={handleListView}
                      src={listview}
                      alt="listView"
                    />
                    <img
                      className="customGrid"
                      onClick={handleCurrentView}
                      src={gridView}
                      alt="gridView"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="customList1"
                      onClick={handleListView}
                      src={emptyList}
                      alt="listView"
                    />
                    <img
                      className="customGrid"
                      onClick={handleCurrentView}
                      src={filledGrid}
                      alt="listView"
                    />
                  </>
                )}
              </div>
            </>
          </div>

          {/* Toggle loading state in case of API does not resolve */}
          {loading && (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Handle error what is there is not PO found so far */}
          {error && (
            <div
              className="alert alert-warning d-flex justify-content-center align-items-center"
              role="alert"
            >
              <svg
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label="Warning:"
              ></svg>
              <div>{error}</div>
            </div>
          )}

          {currentView === "list" && filteredItems ? (
            <div className="row main_row2">
              {filteredItems.map((eachMyPo) => (
                <div className="col-md-6 col-xl-4 col-sm-12 col-lg-6 col-xs-12 cardMargin_2">
                  <Link >
                    <PoCard eachMyPo={eachMyPo}></PoCard>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {filteredItems.map((eachMyPo) => (
                <Link >
                  <Box eachMyPo={eachMyPo}></Box>
                </Link>
              ))}
            </div>
          )}

          {filteredItems?.length === 0 && !error && !loading && (
            <div
              className="alert alert-warning d-flex justify-content-center align-items-center"
              role="alert"
            >
              <svg
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label="Warning:"
              ></svg>
              <div>Could not found PO item!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoSearch;
