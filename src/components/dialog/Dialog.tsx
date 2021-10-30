import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Dialog.scss';
import OverlayPortal from '@components/overlay-portal/OverlayPortal';
import DialogStore from '@components/dialog/store/DialogStore';
import { EDialogType } from '@defines/defines';

const cx = classNames.bind(style);

const store = DialogStore.instance;

export const dialog = {
    alert(message: ReactNode, onConfirm?: () => void, confirmText?: string) {
        store.setMessage(message);
        onConfirm && store.setOnConfirm(onConfirm);
        confirmText && store.setConfirmText(confirmText);
        store.setType(EDialogType.ALERT);
        store.open();
    },

    confirm(message: ReactNode, onConfirm?: () => void, onCancel?: () => void, confirmText?: string, cancelText?: string) {
        store.setMessage(message);
        onConfirm && store.setOnConfirm(onConfirm);
        onCancel && store.setOnCancel(onCancel);
        confirmText && store.setConfirmText(confirmText);
        cancelText && store.setCancelText(cancelText);
        store.setType(EDialogType.CONFIRM);
        store.open();
    },

    close() {
        if (store.isOpened) {
            store.close();
        }
    },
};

const Dialog = observer(() => {
    const { isOpened, message, onConfirm, onCancel, confirmText, cancelText, type, close } = store;

    if (!isOpened) return null;

    const confirm = () => {
        close();
        onConfirm();
    };

    const cancel = () => {
        close();
        onCancel();
    };

    return (
        <OverlayPortal>
            <div className={cx('wrapper')}>
                <div className={cx('dialog')}>
                    <div className={cx('message')}>{message}</div>
                    <div className={cx('buttons')}>
                        <button onClick={confirm} className={cx('confirm')}>
                            {confirmText}
                        </button>
                        {type === EDialogType.CONFIRM && (
                            <button onClick={cancel} className={cx('cancel')}>
                                {cancelText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </OverlayPortal>
    );
});

export default Dialog;
