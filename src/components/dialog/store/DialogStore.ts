import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { EDialogType } from '@defines/defines';
import { ReactNode } from 'react';

@autobind
export default class DialogStore {
    private static _instance: DialogStore;

    @observable private _isOpened: boolean;
    @observable private _message: ReactNode;
    @observable private _confirmText: string = '확인';
    @observable private _cancelText: string = '취소';
    @observable private _type: EDialogType;
    @observable private _onConfirm: () => void = () => {};
    @observable private _onCancel: () => void = () => {};

    private constructor() {
        DialogStore._instance = this;
    }

    static get instance() {
        if (!DialogStore._instance) {
            DialogStore._instance = new DialogStore();
        }
        return this._instance;
    }

    get isOpened(): boolean {
        return this._isOpened;
    }

    get message(): React.ReactNode {
        return this._message;
    }

    get confirmText(): string {
        return this._confirmText;
    }

    get cancelText(): string {
        return this._cancelText;
    }

    get type(): EDialogType {
        return this._type;
    }

    get onConfirm(): () => void {
        return this._onConfirm;
    }

    get onCancel(): () => void {
        return this._onCancel;
    }

    @action
    open() {
        this._isOpened = true;
    }

    @action
    close() {
        this._isOpened = false;
        this._confirmText = '확인';
        this._cancelText = '취소';
        this._onConfirm = () => {};
        this._onCancel = () => {};
    }

    @action
    setMessage(value: ReactNode) {
        this._message = value;
    }

    @action
    setConfirmText(value: string) {
        this._confirmText = value;
    }

    @action
    setCancelText(value: string) {
        this._cancelText = value;
    }

    @action
    setType(value: EDialogType) {
        this._type = value;
    }

    @action
    setOnConfirm(value: () => void) {
        this._onConfirm = value;
    }

    @action
    setOnCancel(value: () => void) {
        this._onCancel = value;
    }
}
