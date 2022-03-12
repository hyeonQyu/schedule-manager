import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';

@autobind
export default class ModalStore {
    @observable private _isOpened: boolean;

    get isOpened(): boolean {
        return this._isOpened;
    }

    @action
    open(initObj?: any, openCallback?: () => boolean) {
        if (openCallback && !openCallback()) return;

        this._isOpened = true;
        this.init(initObj);
    }

    @action
    close() {
        this._isOpened = false;
    }

    protected init(initObj?: any) {}
}
