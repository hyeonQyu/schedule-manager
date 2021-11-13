import { autobind } from 'core-decorators';
import { ENavigationTab } from '@defines/defines';
import { action, observable } from 'mobx';

@autobind
export default class NavigationStore {
    private static _instance: NavigationStore;

    @observable private _currentTab: ENavigationTab = ENavigationTab.ENTIRE;

    private constructor() {
        NavigationStore._instance = this;
    }

    static get instance() {
        if (!NavigationStore._instance) {
            NavigationStore._instance = new NavigationStore();
        }
        return this._instance;
    }

    get currentTab(): ENavigationTab {
        return this._currentTab;
    }

    @action
    setCurrentTab(tab: ENavigationTab) {
        this._currentTab = tab;
    }
}
