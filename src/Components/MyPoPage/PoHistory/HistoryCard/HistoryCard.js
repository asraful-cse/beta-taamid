import React, { useEffect } from "react";
import "./HistoryCard.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPoList } from "../../_redux/Action";
import { useTranslation } from "react-i18next";
const HistoryCard = () => {
  const myPoHistoryInfo = useSelector((state) => state.myPoInfo.myPoListData);

  const { t } = useTranslation();

  // dispatching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyPoList());
  }, []);

  return (
    <div className="row ms-3 ms-lg-2 ms-xl-1">
      <div className="historyContainer mx-0">
        <div
          className="historyList table-responsive-md"
          style={{ overflowX: "auto" }}
        >
          <table className="table" id="historyChart">
            <thead className="custThread">
              {/* customTr */}
              <tr className="customTr">
                <th scope="col">{t("PO NO")}</th>
                <th scope="col">{t("Items")}</th>
                <th scope="col">{t("Supplier")}</th>
                <th scope="col">{t("PO Start Date")}</th>
                <th scope="col">{t("PO End Date")}</th>
                <th scope="col">{t("Status")}</th>
                <th scope="col">{t("Payment Method")}</th>
              </tr>
            </thead>
            <tbody className="customTBody">
              {myPoHistoryInfo &&
                true &&
                myPoHistoryInfo.length > 0 &&
                myPoHistoryInfo.map((historyItem, index) => (
                  <tr
                    key={index}
                    className="customTrd"
                    style={{
                      boxShadow: "0px 20px 32px -24px rgba(15, 15, 15, 0.12)",
                      borderRadius: "12px",
                      backgroundColor: "red",
                    }}
                  >
                    <td className="Accepted">{historyItem.po_no}</td>
                    <td>{historyItem.count}</td>

                    {historyItem.requester && (
                      <td className="Accepted">
                        {" "}
                        {historyItem.requester.name}
                      </td>
                    )}
                    {historyItem.supplier && (
                      <td className="Accepted"> {historyItem.supplier.name}</td>
                    )}
                    {historyItem.superuser && (
                      <td className="Accepted">
                        {" "}
                        {historyItem.superuser.name}
                      </td>
                    )}
                    <td>{historyItem.start_date}</td>
                    <td>{historyItem.end_date}</td>
                    <td>
                      {historyItem.status === 1 ? (
                        <span className="Pending">{t("Pending")}</span>
                      ) : historyItem.status === 2 ? (
                        <span className="Accepted">{t("Accepted")}</span>
                      ) : historyItem.status === 3 ? (
                        <span className="Declined">{t("Declined")}</span>
                      ) : historyItem.status === 4 ? (
                        <span className="Completed">{t("Completed")}</span>
                      ) : historyItem.status === 5 ? (
                        <span className="Cancelled">{t("Cancelled")}</span>
                      ) : (
                        <span className="Expired">{t("Expired")}</span>
                      )}
                    </td>
                    <td>
                      {historyItem.payment_method === 1
                        ?  t("Credit Card")
                        : historyItem.payment_method === 2
                        ?  t("PayPal")
                        : t("Cash")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
