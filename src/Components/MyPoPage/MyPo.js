import React, { useCallback, useEffect, useState } from 'react';
import './MyPo.css';
import listView from '../../images/myPo/listView.png';
import gridView from '../../images/myPo/gridView.png';
import emptyList from '../../images/myPo/emptyList.png';
import filledGrid from '../../images/myPo/filledGrid.png';
import { useDispatch, useSelector } from 'react-redux';
import { GetFilteredOrderData, getMyPoList } from './_redux/Action';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import PoCard from '../LandingPage/PoCard/PoCard';
import { useTranslation } from 'react-i18next';

const MyPo = () => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const poBox = [
    {
      category: 'accepted',
      id: 1,
    },
    {
      category: 'accepted',
      id: 2,
    },
    {
      category: 'accepted',
      id: 3,
    },
    {
      category: 'accepted',
      id: 4,
    },
    {
      category: 'pending',
      id: 5,
    },
    {
      category: 'accepted',
      id: 6,
    },
  ];

  const { pathname } = useLocation();

  // handle grid and list view
  const [listViews, setListView] = useState('list');
  const handleListView = useCallback(() => {
    setCurrentView('grid');

    const viewID = document.getElementById('myPoViewId');
    viewID.classList.add('myPo_View');
  }, [setListView]);

  const [currentView, setCurrentView] = useState('grid');
  const handleCurrentView = useCallback(() => {
    setCurrentView('list');

    const viewID = document.getElementById('myPoViewId');
    viewID.classList.remove('myPo_View');
  }, [setCurrentView]);

  //handle Selection
  const handleSelection = (e) => {
    setFilteredItems(e.target.value);
  };

  const myPoListInfo = useSelector((state) => state.myPoInfo.myPoListData);

  // filtering states section

  const [currentItems, setCurrentItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState(1);

  //filtering based on category
  useEffect(() => {
    const currItems = poBox.filter((item) => item.category === filteredItems);
    setCurrentItems(currItems);
  }, [filteredItems]);

  // my po details delete data section
  const isSinglePoDetailsDeleted = useSelector((state) => state.myPoInfo.isSinglePoDetailsDeleted);

  // pending and accepted data
  const filteredOrderList = useSelector((state) => state.myPoInfo.filteredOrderData);

  // dispatching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyPoList());
  }, []);

  const handleOrders = (name, value) => {
    let status = '';
    if (value == 1) {
      status = 'pending';
      dispatch(GetFilteredOrderData(status));
    }
    if (value == 2) {
      status = 'accepted';

      dispatch(GetFilteredOrderData(status));
    }
  };
  const { catId, poItemId } = useParams();
  return (
    <>
      <div id='myPoViewId' className='myPoView myPo_View'>
        {pathname === `/myPo` ? (
          <>
            <h3 className='customMyPoTitle'>{t('My Po')} </h3>
            <div className='d-flex'>
              {currentView === 'grid' ? (
                <>
                  <img
                    className='customList'
                    onClick={handleListView}
                    src={listView}
                    alt='listView'
                  />
                  <img
                    className='customGrid'
                    onClick={handleCurrentView}
                    src={gridView}
                    alt='gridView'
                  />
                </>
              ) : (
                <>
                  <img
                    className='customList1'
                    onClick={handleListView}
                    src={emptyList}
                    alt='listView'
                  />
                  <img
                    className='customGrid'
                    onClick={handleCurrentView}
                    src={filledGrid}
                    alt='listView'
                  />
                </>
              )}
            </div>
          </>
        ) : (
          pathname === `/requester` && (
            <>
              <h3 className='customMyPoTitle'>{t('My Po')}</h3>
              <div className='d-flex'>
                {currentView === 'grid' ? (
                  <>
                    <img
                      className='customList'
                      onClick={handleListView}
                      src={listView}
                      alt='listView'
                    />
                    <img
                      className='customGrid'
                      onClick={handleCurrentView}
                      src={gridView}
                      alt='gridView'
                    />
                  </>
                ) : (
                  <>
                    <img
                      className='customList1'
                      onClick={handleListView}
                      src={emptyList}
                      alt='listView'
                    />
                    <img
                      className='customGrid'
                      onClick={handleCurrentView}
                      src={filledGrid}
                      alt='listView'
                    />
                  </>
                )}
              </div>
            </>
          )
        )}
      </div>
      <div>
        {currentView === 'list' ? (
          <div className='row main_row2'>
            {myPoListInfo &&
              myPoListInfo.map((eachMyPo) => (
                
                <Link
                  
                  style={{ paddingLeft: 0 }}
                  className={`  customLink banner mt-4 ${pathname === `/myPo`
                    ? 'col-md-6 col-xl-4 col-sm-6 col-lg-6 col-xs-12'
                    : pathname === `/requester`
                      ? 'col-md-6 col-xl-4 col-sm-6 col-lg-6 col-xs-12'
                      : pathname === `/posearch/${catId}`
                        ? 'col-md-6 col-xl-4 col-sm-6 col-lg-6 col-xs-12'
                        : 'col-md-6 col-xl-4 col-sm-6 col-lg-6 col-xs-12'
                    }`}>
                  <PoCard eachMyPo={eachMyPo}></PoCard>
                </Link>
              ))}
          </div>
        ) : (
          <>
            {/*</PoBoxCard>)}*/}
            {myPoListInfo && true && myPoListInfo.length > 0 && (
              <div>
                {myPoListInfo &&
                  myPoListInfo.map((eachMyPo, index) => (
                    <Link
                      to={`/singlePoDetails/${eachMyPo.id}`}
                      target='_blank'
                      key={index}
                      className='customLink'>
                      <div className='poBoxCard'>
                        <div className='justify-content-between d-flex'>
                          <button className='poNoList'>
                            {t('PO NO')}: {eachMyPo.po_no}
                          </button>
                        </div>

                        <div className='justify-content-between'>
                          <h3 className='PoBoxTitle'>{eachMyPo.title}</h3>
                          <p className='PoSubTitle'>{eachMyPo.description}</p>
                        </div>

                        <div className='cardBoxBody row'>
                          <div className='col-md-3 mr-4'>
                            <button className='poCardSubBtn mb-3'>
                              {eachMyPo.category_details.name}
                            </button>
                          </div>
                        </div>
                        <div className='CardDetails'>
                          <div className='d-flex'>
                            <p className='spanItem'>
                              <span className='spanTittle'>{t('Offers Received')}:</span>{' '}
                              <span className='output'> {t('not sure')}</span>
                            </p>
                            <p>
                              {/* <FontAwesomeIcon icon="fa-solid fa-calendar-days"/> */}
                              <span className='spanTittle'> {t('PO Created by')}:</span>
                              {eachMyPo.requester && (
                                <span className='output'> {eachMyPo.requester.name}</span>
                              )}
                              {eachMyPo.supplier && (
                                <span className='output'> {eachMyPo.supplier.name}</span>
                              )}
                              {eachMyPo.superUser && (
                                <span className='output'> {eachMyPo.superUser.name}</span>
                              )}
                            </p>
                          </div>
                          <div className='d-flex '>
                            <p className='spanViewItem'>
                              <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className='me-2 fs-6 '
                                style={{ color: '#cfc9c7' }}
                              />
                              <span className='spanTittle'>{t('PO Start Date')}:</span>
                              <span className='output'>{eachMyPo.start_date}</span>
                            </p>
                            <p className='spanViewItem'>
                              <i style={{ color: '#777E90' }} className='bi bi-eye me-2 fs-6'></i>
                              <span className='spanTittle'>{t('View')}:</span>{' '}
                              <span className='output'> {t('No')} </span>
                            </p>
                            <p>
                              <i style={{ color: '#777E90' }} className='bi bi-clock me-2 fs-6'></i>
                              <span className='spanTittle'>{t('Validity')}: </span>{' '}
                              <span className='output'>
                                {' '}
                                {eachMyPo.validity} {t('days')}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyPo;
