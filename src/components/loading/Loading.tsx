import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Loading.scss';
import OverlayPortal from '@components/overlay-portal/OverlayPortal';
import LoadingStore from '@components/loading/store/LoadingStore';

const cx = classNames.bind(style);

const store = LoadingStore.instance;

export const loading = {
    show() {
        store.show();
    },

    hide() {
        store.hide();
    },
};

const Loading = observer(() => {
    const { count } = store;
    const isOpened = count > 0;

    if (!isOpened) return null;

    return (
        <OverlayPortal>
            <div className={cx('wrapper')}>
                <div className={cx('loading')} />
            </div>
        </OverlayPortal>
    );
});

export default Loading;
