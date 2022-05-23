import React from "react";
import MyPo from "../../../src/Components/MyPoPage/MyPo";
import RootBrand from "../../Components/MyPoPage/RootBrand/RootBrand";

const Requester = () => (
  <>
    <div className="row">
      <div className="col-md-3">
        <RootBrand></RootBrand>
      </div>
      <div className="col-md-9">
        <MyPo></MyPo>
      </div>
    </div>
  </>
);

export default {
  
  routeProps: {
    path: "/requester",
    exact: true,
    component: Requester,
  },
  name: "Switch to Requester",
};
