import React, { HTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './SlidingModal.scss';
import OverlayPortal from '@components/common/overlay-portal/OverlayPortal';

const cx = classNames.bind(style);

export interface SlidingModalProps extends HTMLAttributes<HTMLDivElement> {
    isOpened?: boolean;
    title?: string;
    onClickConfirm?: () => void;
    onClickCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmDisabled?: boolean;
}

const SlidingModal = (props: SlidingModalProps) => {
    const [init, setInit] = useState(false);
    const [visibleChanging, setVisibleChanging] = useState(false);

    const {
        isOpened = false,
        title = '',
        onClickConfirm,
        onClickCancel,
        confirmText = '완료',
        cancelText = '닫기',
        confirmDisabled = false,
        className,
        children,
    } = props;

    useEffect(() => {
        if (visibleChanging) return;

        if (!init) {
            setInit(true);
            return;
        }
        setVisibleChanging(true);
        setTimeout(() => {
            setVisibleChanging(false);
        }, 600);
    }, [isOpened]);

    if (!isOpened && !visibleChanging) return null;

    return (
        <OverlayPortal>
            <div className={cx('wrapper')}>
                <div className={classNames(cx('sliding-modal', isOpened ? 'open' : 'close'), className)}>
                    <div className={cx('header')}>
                        <button className={cx('cancel', !onClickCancel && 'hide')} onClick={onClickCancel}>
                            {cancelText}
                        </button>
                        <h2>{title}</h2>
                        <button className={cx('confirm', !onClickConfirm && 'hide')} onClick={onClickConfirm} disabled={confirmDisabled}>
                            {confirmText}
                        </button>
                    </div>
                    <div className={cx('body')}>{children}</div>
                </div>
            </div>
        </OverlayPortal>
    );
};

export default SlidingModal;
