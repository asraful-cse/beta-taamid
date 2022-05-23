import React from 'react';
import RootBrand from "../../Components/MyPoPage/RootBrand/RootBrand";
import ManageOffer from '../../SupplierComponents/SupplierPo/ManageOffer/ManageOffer'
import MyPage from "../../Components/MyPoPage/MyPage/MyPage";


const Supplier = () => (
    <>
        <div className='row'>
            <div className='col-md-3'>
                <RootBrand></RootBrand>

            </div>
            <div className='col-md-9'>
                <MyPage/>
            </div>
        </div>

    </>
);

export default {
    routeProps: {
        path: '/supplier',
        component: Supplier
    },
    name: 'Switch to Supplier',
}