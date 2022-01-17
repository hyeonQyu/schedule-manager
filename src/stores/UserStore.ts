import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import firebaseService, { authService } from 'firebaseService';
import { dialog } from '@components/common/dialog/Dialog';
import env from 'env.js';
import { loading } from '@components/common/loading/Loading';

@autobind
export default class UserStore {
    private static _instance: UserStore;

    @observable private _isLoggedIn: boolean = false;
    @observable private _userEmail: string = '';

    private constructor() {
        UserStore._instance = this;

        loading.show();
        authService.onAuthStateChanged((user) => {
            if (this.isRightUser(user)) {
                this._isLoggedIn = true;
                this._userEmail = user.email;
            }
            loading.hide();
        });
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

    get userEmail(): string {
        return this._userEmail;
    }

    /**
     * 구글 계정으로 로그인
     */
    @action
    continueWithGoogle() {
        const provider = new firebaseService.auth.GoogleAuthProvider();
        (async () => {
            try {
                const result = await authService.signInWithPopup(provider);
                if (this.isRightUser(result.user)) {
                    this._isLoggedIn = true;
                }
            } catch (e) {}
        })();
    }

    /**
     * 허용된 사용자인지 검사
     * @param user
     * @private
     */
    private isRightUser(user) {
        if (!user) return false;

        const { email } = user;
        for (let i = 0; i < env.MAIL_ACCOUNTS.length; i++) {
            if (email === env.MAIL_ACCOUNTS[i]) {
                return true;
            }
        }
        dialog.alert('허용된 계정이 아닙니다.');
        return false;
    }
}
