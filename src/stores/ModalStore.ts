import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';

@autobind
export default class ModalStore {
    @observable private _isOpened: boolean;

    get isOpened(): boolean {
        return this._isOpened;
    }

    @action
    open() {
        this._isOpened = true;
        this.init();
    }

    @action
    close() {
        this._isOpened = false;
    }

    protected init() {}
}
