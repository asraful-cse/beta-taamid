import React, {useEffect} from 'react';
import './PoSection.css'
import {
    Link
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetLatestPoData} from "../../MyPoPage/_redux/Action";
import RecentPoCard from '../RecentPoCard/RecentPoCard';

import { useTranslation } from 'react-i18next';

const PoSection = () => {
    const { t } = useTranslation();
    const latestPoInfo = useSelector((state) => state.myPoInfo.latestPoData);
    

    // dispatching
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetLatestPoData());
    }, []);
    return (
      <div className='po-container' id={'recentPo'}>
          <div className='d-flex justify-content-between'>
              <h2 className='recentPo'>{t("Recent PO")}</h2>
             <Link to='/viewAll' className='removeLinkCss'> <p className='viewAll'>{t("View all")}</p></Link>
          </div>
          {
              latestPoInfo &&

              <div className=''>
                  <div className='row main_row '>
                      {
                          latestPoInfo.length<=8 ?

                              (
                                  latestPoInfo.map(eachMyPo => <RecentPoCard eachMyPo={eachMyPo}></RecentPoCard>)
                              )
                              :
                              (
                                  latestPoInfo.slice(0,6).map(eachMyPo => <RecentPoCard eachMyPo={eachMyPo}></RecentPoCard>)
                              )
                      }

                  </div>
              </div>
          }
      </div>
    );
};

export default PoSection;