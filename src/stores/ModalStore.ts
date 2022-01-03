import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';

@autobind
export default class ModalStore {
    @observable private _isOpened: boolean;

    get isOpened(): boolean {
        return this._isOpened;
    }

    @action
    open(initObj?: any, openCallback?: () => void) {
        this._isOpened = true;
        this.init(initObj);
        openCallback && openCallback();
    }

    @action
    close() {
        this._isOpened = false;
    }

    protected init(initObj?: any) {}
}
