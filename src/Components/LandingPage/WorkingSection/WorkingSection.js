import { React, useEffect, useState } from 'react';
import './WorkingSection.css';
import { Accordion, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkingList } from '../_redux/Action';
import { useTranslation } from 'react-i18next';

const WorkingSection = () => {
    const [works, setWorks] = useState([]);
    const [userType, userTypeSet] = useState(2);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const workingListInfo = useSelector((state) => state.landingInfo.workingListData);

    const handleChangeWorks = (event) => userTypeSet(parseInt(event.target.value, 10));

    useEffect(() => {
        dispatch(getWorkingList());
    }, [dispatch]);

    useEffect(() => {
        if (workingListInfo) {
            const selectedCategory = workingListInfo.filter((work) => work.user_type === userType);
            setWorks(selectedCategory);
        }
    }, [userType, workingListInfo]);

    return (
        <div id='howtowork' className='row customWorkingSection customWorkingSection_2'>
            <div className='row'>
                <div className='col-sm-6 col-12'>
                    <p className='workingTitle'>{t('How it works')}</p>
                </div>

                <div className='col-sm-6 col-12'>
                    <div className='d-flex justify-content-end align-items-end'>
                        <ButtonGroup
                            size='sm'
                            className='border border-2 rounded-pill py-1 px-1'
                            style={{ borderColor: '#e6e8ec' }}>
                            <Button
                                className={`bg-none px-5 rounded-pill ${userType === 2
                                    ? 'bg-success text-white'
                                    : 'bg-white text-dark border border-white'
                                    }`}
                                value={2}
                                onClick={handleChangeWorks}>
                                {t('Seller')}
                            </Button>
                            <Button
                                className={`bg-none px-5 rounded-pill ${userType === 3
                                    ? 'bg-success text-white'
                                    : 'bg-white text-dark border border-white'
                                    }`}
                                value={3}
                                onClick={handleChangeWorks}>
                                {t('Requester')}
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>

            <hr className='WorkingDivider' />

            <div className='row  d-flex'>
                <div className='col-lg-6 col-md-8 col-12 workingAcc workingAcc_2'>
                    <ul className='pl-0'>
                        {works.map((item, index) => (
                            <Accordion defaultActiveKey={0} key={item?.id} flush>
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>
                                        <i className='bi bi-check-circle-fill checkColor mx-2'></i>
                                        <span className='accTitle'>{item.title}</span>
                                    </Accordion.Header>
                                    <Accordion.Body className='accBody'>{item.description}</Accordion.Body>
                                    <hr />
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </ul>
                </div>

                <div
                    className='col-lg-6  col-12 d-flex align-items-center flex-lg-row flex-column'
                    key={Math.random()}>
                    <div
                        className='d-flex flex-lg-column flex-row justify-content-sm-around flex-warp '
                        key='Math.random'>
                        {works.slice(0 - 3).map((item) => (
                            <img key={item?.id} className='workingImg1 ' src={item.image} alt='work1' />
                        ))}
                    </div>

                    <div
                        className='d-flex flex-lg-column flex-row justify-content-sm-around'
                        key='Math.random'>
                        {works.slice(4 - 6).map((item) => (
                            <img key={item?.id} className='workingImg2 ' src={item?.image} alt='work4' />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkingSection;
