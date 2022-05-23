import React from 'react';
import SupplierPoDetailsView from '../SupplierPoDetailsView/SupplierPoDetailsView'
import UploadStamp from '../SupplierPoDetailsView/UploadStamp/UploadStamp'

const PoDetailsViewPage = () => {
    return (
        <div>
            <SupplierPoDetailsView />
            <UploadStamp />
        </div>
    );
};

export default PoDetailsViewPage;