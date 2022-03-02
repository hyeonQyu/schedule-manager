import React, { ReactNode, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './Dialog.scss';
import OverlayPortal from '@components/common/overlay-portal/OverlayPortal';
import DialogStore from '@components/common/dialog/store/DialogStore';
import { EDialogType } from '@defines/defines';
import { ComponentUtil } from '@utils/ComponentUtil';

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
    const { isOpened, message, onConfirm, onCancel, confirmText, cancelText, type, close, mounted, setMounted } = store;

    const dialogRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const element = dialogRef.current;
        if (isOpened || !element) return;

        ComponentUtil.unmountComponent<HTMLDivElement>(
            element,
            () => ComponentUtil.getCssStylePropertyValueFromElement(element, 'opacity') === '0',
            () => setMounted(false),
        );
    }, [isOpened]);

    if (!mounted) return null;

    const confirm = () => {
        close();
        onConfirm();
    };

    const cancel = () => {
        close();
        onCancel();
    };

    const clsClose = !isOpened && 'close';

    return (
        <OverlayPortal>
            <div className={cx('wrapper', clsClose)}>
                <div className={cx('dialog', clsClose)} ref={dialogRef}>
                    <div className={cx('message')}>{message}</div>
                    <div className={cx('buttons')}>
                        {type === EDialogType.CONFIRM && (
                            <button onClick={cancel} className={cx('cancel')}>
                                {cancelText}
                            </button>
                        )}
                        <button onClick={confirm} className={cx('confirm')}>
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </OverlayPortal>
    );
});

export default Dialog;
