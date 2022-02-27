import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Toast.scss';
import OverlayPortal from '@components/common/overlay-portal/OverlayPortal';
import ToastStore from '@components/common/toast/store/ToastStore';
import { ToastType } from '@defines/defines';
import { ComponentUtil } from '@utils/ComponentUtil';

const cx = classNames.bind(style);

const store = ToastStore.instance;

export const toast = {
    show(message: string, type: ToastType, duration: number = 3) {
        store.setMessage(message);
        store.setType(type);
        store.open(duration);
    },

    close() {
        store.close(true);
    },
};

const Toast = observer(() => {
    const { isOpened, message, type, mounted, setMounted } = store;

    const toastRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const element = toastRef.current;
        if (isOpened || !element) return;

        ComponentUtil.unmountComponent<HTMLDivElement>(
            element,
            () => window.getComputedStyle(element).getPropertyValue('opacity') === '0',
            () => setMounted(false),
        );
    }, [isOpened]);

    if (!mounted) return null;

    return (
        <OverlayPortal>
            <div className={cx('wrapper')}>
                <div className={cx('toast', type, !isOpened && 'close')} ref={toastRef}>
                    <div className={cx('icon')} />
                    <div className={cx('message')}>{message}</div>
                    <div className={cx('close')} onClick={toast.close} />
                </div>
            </div>
        </OverlayPortal>
    );
});

export default Toast;
