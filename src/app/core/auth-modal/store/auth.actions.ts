import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const TOGGLE_TEST_MODE = 'TOGGLE_TEST_MODE';

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload: { username: string, password: string }) {
        console.log('auth signin actions');
    }
}

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload: { username: string, password: string }) {
        console.log('auth signin actions');
    }
}

export class Signin implements Action {
    readonly type = SIGNIN;

    constructor(public payload: { token: string, uid: string }) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class toggleTestMode implements Action {
    readonly type = TOGGLE_TEST_MODE;
}


export type AuthActions = Signin | Logout | TrySignup | TrySignin | AutoLogin | toggleTestMode;