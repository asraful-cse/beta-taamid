import React, {useEffect} from 'react';
import CounterSection from "./CounterSection";
import {useDispatch, useSelector} from "react-redux";
import {getPartnersCounts} from "../_redux/Action";



const CounterInfo = () => {

    const partnerCountInfo = useSelector((state) => state.landingInfo.partnerCountsData);

    console.log("partnerCountInfo", partnerCountInfo);

// dispatching
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPartnersCounts());
    }, []);


    return (
        <section className="container-fluid ">
            <div className="row">
                {
                    partnerCountInfo&&
                    partnerCountInfo.map((count,index) => <CounterSection count={count} key={index}/>)
                }
            </div>
        </section>
    );
};

export default CounterInfo;