import * as AuthActions from './auth.actions';
import * as fromApp from '../../../store/app-reducer';

export interface FeatureState extends fromApp.AppState {
    token: string;
    authenticated: boolean;
    uid: string;
}

export interface State {
    token: string;
    authenticated: boolean;
    uid: string;
    registration: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false,
    uid: null,
    registration: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNIN:
            return {
                ...state,
                authenticated: true,
                token: action.payload.token,
                uid: action.payload.uid
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false,
            };
        case AuthActions.SET_IS_REGISTRATION:
            return {
                ...state,
                registration: action.payload
            }
        default:
            return state;
    }
}