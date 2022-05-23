import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import listview from "../../images/myPo/listView.png";
import gridView from "../../images/myPo/gridView.png";
import emptyList from "../../images/myPo/emptyList.png";
import filledGrid from "../../images/myPo/filledGrid.png";
import PoCard from "../../Components/LandingPage/PoCard/PoCard";
import Box from "../po/Box";
import "./Posearch.css";
import isEmpty from "../../utils/isEmpty";

// A custom hook that builds on useLocation to parse query params
export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PoSearch = () => {
    const [po, poSet] = useState([]);
    const [loading, loadingSet] = useState(false);
    const [error, errorSet] = useState('');
    const [currentView, setCurrentView] = useState("grid");

    const query = useQuery();
    const queryParam = query.get('po_no');

    const handleListView = useCallback(() => setCurrentView("grid"), []);
    const handleCurrentView = useCallback(() => setCurrentView("list"), [setCurrentView]);

    const getPOByQueryParam = async () => {
        const apiEndPoint = process.env.API_URL || "https://dev.taamid.com/api/";

        try {
            errorSet('');
            loadingSet(true);
            const response = await axios.get(`${apiEndPoint}polist?po_no=${queryParam}`);

            if (response.data) {
                loadingSet(false);
                poSet(response.data?.purchase_order_list);
            }

            if (isEmpty(response.data?.purchase_order_list)) {
                loadingSet(false);
                poSet([]);
                errorSet(`Could not find any PO with ID: ${queryParam}`);
            }
        } catch (error) {
            loadingSet(false);
            errorSet(`Could not find any PO with ID: ${queryParam}`);
        }
    };

    useEffect(() => {
        getPOByQueryParam();

        return () => poSet([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParam]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="d-flex justify-content-end">
                        {currentView === "grid" ? (
                            <>
                                <img className="customList" onClick={handleListView} src={listview} alt="listView" />
                                <img className="customGrid" onClick={handleCurrentView} src={gridView} alt="gridView" />
                            </>
                        ) : (
                            <>
                                <img className="customList1" onClick={handleListView} src={emptyList} alt="listView" />
                                <img className="customGrid" onClick={handleCurrentView} src={filledGrid} alt="listView" />
                            </>
                        )}
                    </div>

                    <hr />

                    {/* Toggle loading state in case of API does not resolve */}
                    {loading && <div className="d-flex justify-content-center my-2">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}

                    {/* Handle error what is there is not PO found so far */}
                    {error && <div className="alert alert-warning d-flex justify-content-center align-items-center" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
                        <div>{error}</div>
                    </div>}

                    {currentView === "list" ? (
                        <div className="row">
                            {po?.map(eachMyPo =>
                                <Link to={`/poDetailsView/${eachMyPo.id}`}>
                                    <PoCard eachMyPo={eachMyPo} />
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="row">
                            {po?.map(eachMyPo =>
                                <Link to={`/poDetailsView/${eachMyPo.id}`}>
                                    <Box eachMyPo={eachMyPo} />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PoSearch;
