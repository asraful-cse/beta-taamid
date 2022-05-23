import React from "react";
import "./CounterSection.css";

const CounterSection = ({ count }) => {
    console.log('count', count.id)
  return (
    <div className="col-md-4 col-lg-4 col-sm-12 align-items-center p-3">
      <div
        className="counterCard event"
        style={count.id==1? { background: `#E5FFF1` }: count.id==2? { background: `#FFF5D9` }: { background: `#E7E9EC` }}
      >
                  <img
                      id="sweetlandia"
                      style={{
                          maxHeight: "100px",
                          maxWidth: "100px",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                          padding: "5px",
                          color: 'blue',
                          marginTop:'40px'
                      }}

                      src={count.image}
                      alt="card-img"
                  />

        <div className="card-body">
          <h5 className="card-title">{count.counts}</h5>
          <p className="card-text">{count.title}</p>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
