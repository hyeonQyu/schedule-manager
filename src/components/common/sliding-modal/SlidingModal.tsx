import React, { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './SlidingModal.scss';
import OverlayPortal from '@components/common/overlay-portal/OverlayPortal';
import { ComponentUtil } from '@utils/ComponentUtil';

const cx = classNames.bind(style);

export interface SlidingModalProps extends HTMLAttributes<HTMLDivElement> {
    isOpened?: boolean;
    title?: string;
    onClickConfirm?: () => void;
    onClickCancel?: () => void;
    confirmNode?: ReactNode;
    cancelNode?: ReactNode;
    confirmDisabled?: boolean;
}

const SlidingModal = (props: SlidingModalProps) => {
    const {
        isOpened = false,
        title = '',
        onClickConfirm,
        onClickCancel,
        confirmNode = '완료',
        cancelNode = '닫기',
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

        const element = slidingModalRef.current;
        if (!element) return;

        ComponentUtil.unmountComponent<HTMLDivElement>(
            element,
            () => element.getBoundingClientRect().y >= window.innerHeight,
            () => setMounted(false),
        );
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
                            {cancelNode}
                        </button>
                        <h2>{title}</h2>
                        <button className={cx('confirm', !onClickConfirm && 'hide')} onClick={onClickConfirm} disabled={confirmDisabled}>
                            {confirmNode}
                        </button>
                    </div>
                    <div className={cx('body')}>{children}</div>
                </div>
            </div>
        </OverlayPortal>
    );
};

export default SlidingModal;
