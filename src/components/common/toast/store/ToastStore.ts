import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { ToastType } from '@defines/defines';

@autobind
export default class ToastStore {
    private static _instance: ToastStore;

    @observable private _isOpened: boolean;
    @observable private _message: string;
    @observable private _type: ToastType;

    private _id: number;

    private constructor() {
        ToastStore._instance = this;
    }

    static get instance() {
        if (!ToastStore._instance) {
            ToastStore._instance = new ToastStore();
        }
        return this._instance;
    }

    get isOpened(): boolean {
        return this._isOpened;
    }

    get message(): string {
        return this._message;
    }

    get type(): ToastType {
        return this._type;
    }

    @action
    open(duration: number) {
        const id = Math.random();
        this._id = id;

        this._isOpened = true;
        setTimeout(() => {
            this.close(false, id);
        }, duration * 1000);
    }

    @action
    close(mustClose: boolean, id?: number) {
        if (this.isOpened) {
            if (mustClose) {
                this._isOpened = false;
                return;
            }

            if (id === this._id) {
                this._isOpened = false;
            }
        }
    }

    @action
    setMessage(value: string) {
        this._message = value;
    }

    @action
    setType(value: ToastType) {
        this._type = value;
    }
}
