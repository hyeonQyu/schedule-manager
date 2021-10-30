import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface OverlayPortalProps {
    children?: ReactNode;
}

const OverlayPortal = (props: OverlayPortalProps) => {
    const { children } = props;
    const elem = document.getElementById('portal');

    if (elem) {
        return ReactDOM.createPortal(children, elem);
    }
    return null;
};

export default OverlayPortal;
