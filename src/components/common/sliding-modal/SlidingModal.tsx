import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
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

    const [mounted, setMounted] = useState(isOpened);

    const slidingModalRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (isOpened) {
            setMounted(true);
            return;
        }

        const interval = setInterval(() => {
            const element = slidingModalRef.current;
            if (!element) {
                clearInterval(interval);
                return;
            }
            if (element.getBoundingClientRect().y >= window.innerHeight) {
                clearInterval(interval);
                setMounted(false);
            }
        }, 100);
    }, [isOpened]);

    if (!mounted) {
        return null;
    }

    return (
        <OverlayPortal>
            <div className={cx('wrapper')}>
                <div className={classNames(cx('sliding-modal', isOpened ? 'open' : 'close'), className)} ref={slidingModalRef}>
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
