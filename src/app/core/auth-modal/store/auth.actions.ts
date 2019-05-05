import { Action } from '@ngrx/store';

export const LOGOUT = 'LOGOUT';
export const SIGNIN = 'SIGNIN';
export const SET_IS_REGISTRATION = 'SET_IS_REGISTRATION'
export const TOGGLE_TEST_MODE = 'TOGGLE_TEST_MODE';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class Signin implements Action {
    readonly type = SIGNIN;

    constructor(public payload: { token: string, uid: string }) { }
}

export class SetIsRegistration implements Action {
    readonly type = SET_IS_REGISTRATION;

    constructor(public payload: boolean) { }
}

export class toggleTestMode implements Action {
    readonly type = TOGGLE_TEST_MODE;
}

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload: { username: string, password: string }) { }
}

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload: { username: string, password: string }) { }
}


export type AuthActions = SetIsRegistration | Signin | Logout | TrySignup | TrySignin | toggleTestMode;