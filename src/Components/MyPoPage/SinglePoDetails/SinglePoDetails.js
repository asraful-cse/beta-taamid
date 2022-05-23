import React from "react";
import ListOfItems from "./ListOfItems/ListOfItems";
import ListPoDetailsCard from "./ListPoDetailsCard/ListPoDetailsCard";
import PendingPoDetails from "../PendingPoDetails/PendingPoDetails";

const SinglePoDetails = () => {
  return (
    <div className="container">
      <ListPoDetailsCard></ListPoDetailsCard>
    </div>
  );
};

export default SinglePoDetails;
