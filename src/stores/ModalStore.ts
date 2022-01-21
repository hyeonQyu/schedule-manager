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
        document.body.style.overflow = 'hidden';
    }

    @action
    close() {
        this._isOpened = false;
        document.body.style.overflow = 'unset';
    }

    protected init(initObj?: any) {}
}
