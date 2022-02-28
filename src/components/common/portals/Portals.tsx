import React from 'react';
import Dialog from '@components/common/dialog/Dialog';
import Loading from '@components/common/loading/Loading';
import Toast from '@components/common/toast/Toast';

const Portals = () => {
    return (
        <>
            <Dialog />
            <Loading />
            <Toast />
        </>
    );
};

export default Portals;
