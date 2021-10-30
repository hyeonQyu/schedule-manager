import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';

@autobind
export default class LoadingStore {
    private static _instance: LoadingStore;

    @observable private _count: number = 0;

    private constructor() {
        LoadingStore._instance = this;
    }

    static get instance() {
        if (!LoadingStore._instance) {
            LoadingStore._instance = new LoadingStore();
        }
        return this._instance;
    }

    get count(): number {
        return this._count;
    }

    @action
    show() {
        this._count++;
    }

    @action
    hide() {
        if (this._count > 0) {
            this._count--;
        }
    }
}
