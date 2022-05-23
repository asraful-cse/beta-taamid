import React, { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { GetLatestPoData } from '../../MyPoPage/_redux/Action';
import RecentPoCard from "../RecentPoCard/RecentPoCard";


const ViewAllPage = () => {
    const latestPoInfo = useSelector((state) => state.myPoInfo.latestPoData);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetLatestPoData());
    }, []);
    


    return (
        <div className='container'>
            <div className='row mt-5'>
                {
                 latestPoInfo && latestPoInfo.map(eachMyPo => <RecentPoCard eachMyPo={eachMyPo}></RecentPoCard>)
                }
            </div>
        </div>
    );
};

export default ViewAllPage;