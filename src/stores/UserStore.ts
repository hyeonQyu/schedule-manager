import { autobind } from 'core-decorators';
import { observable } from 'mobx';

@autobind
export default class UserStore {
    private static _instance: UserStore;

    @observable private _isLoggedIn: boolean = false;

    private constructor() {
        UserStore._instance = this;
    }

    static get instance() {
        if (!UserStore._instance) {
            UserStore._instance = new UserStore();
        }
        return this._instance;
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
}
