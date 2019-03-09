import * as AuthActions from './auth.actions';
import * as fromApp from '../../../store/app-reducer';

export interface FeatureState extends fromApp.AppState {
    token: string;
    authenticated: boolean;
    uid: string;
    loggedIn: boolean;
    testMode: boolean;
}

export interface State {
    token: string;
    authenticated: boolean;
    uid: string;
    loggedIn: boolean;
    testMode: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false,
    uid: null,
    loggedIn: false,
    testMode: false,
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                authenticated: true,
                loggedIn: true,
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false,
                loggedIn: false,
            };
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case AuthActions.AUTO_LOGIN:
            return {
                ...state
            };
        case AuthActions.TOGGLE_TEST_MODE:
            const newMode = !state.testMode;
            return {
                ...state,
                testMode: newMode
            };
        default:
            return state;
    }
}