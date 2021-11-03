import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import { authService } from 'firebaseService.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { dialog } from '@components/common/dialog/Dialog';
import env from 'env.js';

@autobind
export default class UserStore {
    private static _instance: UserStore;

    @observable private _isLoggedIn: boolean = false;
    @observable private _userEmail: string = '';

    private constructor() {
        UserStore._instance = this;

        authService.onAuthStateChanged((user) => {
            if (user && this.isRightUser(user)) {
                this._isLoggedIn = true;
                return;
            }
            this._isLoggedIn = false;
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

    /**
     * 구글 계정으로 로그인
     */
    @action
    continueWithGoogle() {
        const provider = new GoogleAuthProvider();
        (async () => {
            try {
                const result = await signInWithPopup(authService, provider);
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
        const { email } = user;
        for (let i = 0; i < env.MAIL_ACCOUNTS.length; i++) {
            if (email === env.MAIL_ACCOUNTS[i]) {
                this._userEmail = email;
                return true;
            }
        }
        dialog.alert('허용된 계정이 아닙니다.');
        return false;
    }
}
