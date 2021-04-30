import { Action } from 'redux';
import { catchError, filter, map, mapTo, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { ObservableInput, of } from 'rxjs';

import { AppEpic } from './store';
import { AuthError, AuthErrorAttributes } from '../errors/component/auth.redux';
import { AuthService } from '../services/auth.service';
import { AuthTypes } from '../enums/auth-types.enum';
import SessionData from '../data-types/session-data';

export interface AuthState {
  error?: Error;
  isAuthenticated: boolean;
  session?: SessionData;
}

interface SignInRequestParams {
  email: string;
  password: string;
}

interface SignInRequestAction extends Action<typeof AuthTypes.SIGN_IN_REQUEST> {
  payload: SignInRequestParams;
}
export const signInRequestAction = (params: SignInRequestParams): SignInRequestAction => ({
  type: AuthTypes.SIGN_IN_REQUEST,
  payload: params
});

interface SignInSuccessAction extends Action<typeof AuthTypes.SIGN_IN_SUCCESS> {
  payload: SessionData;
}
const signInSuccessAction = (session: SessionData): SignInSuccessAction => ({
  type: AuthTypes.SIGN_IN_SUCCESS,
  payload: { user: { name: session.user.name }, token: session.token },
});

interface SignInFailureAction extends Action<typeof AuthTypes.SIGN_IN_FAILURE> {
  payload: { message: String }
}
const signInFailureAction = (error: AuthErrorAttributes): SignInFailureAction => ({
  type: AuthTypes.SIGN_IN_FAILURE,
  payload: { message: AuthError(error)}
})

export interface LoadTokenAction extends Action<typeof AuthTypes.LOAD_TOKEN> {
  payload: { token: string };
}
export const loadTokenAction = (token: string): LoadTokenAction => ({
  type: AuthTypes.LOAD_TOKEN,
  payload: { token },
});

export interface SignOutRequestAction extends Action<typeof AuthTypes.SIGN_OUT_REQUEST> {}
export const signOutAction = (): SignOutRequestAction => ({
  type: AuthTypes.SIGN_OUT_REQUEST,
});

export interface SignOutSuccessAction extends Action<typeof AuthTypes.SIGN_OUT_SUCCESS> {}
export const signOutSuccessAction = (): SignOutSuccessAction => ({
  type: AuthTypes.SIGN_OUT_SUCCESS,
});

const signInEpic: AppEpic<
  SignInFailureAction | SignInRequestAction | SignInSuccessAction,
  SignInFailureAction | SignInSuccessAction
> = (action$, _, { authService }: {authService: AuthService}) =>
  action$.pipe(
    filter(isOfType(AuthTypes.SIGN_IN_REQUEST)),
    switchMap((action):ObservableInput<any> =>
      authService.signIn(action.payload).pipe(
        map((res) => {
          authService.setTokenToLocalStorage(res.body.token);
          return signInSuccessAction(res.body);
        }),
        catchError((err) => of(signInFailureAction(err))),
      )
    ),
  );

const signOutEpic: AppEpic<
  SignOutRequestAction | SignOutSuccessAction,
  SignOutSuccessAction
> = (action$, _, { authService }: {authService: AuthService}) =>
  action$.pipe(
    filter(isOfType(AuthTypes.SIGN_OUT_REQUEST)),
    switchMap(() => authService.signOut()),
    mapTo(signOutSuccessAction()),
  );

export const authEpic = combineEpics<AppEpic>(
  (signInEpic as any) as AppEpic,
  signOutEpic
);

const initialState: AuthState = {
  error: undefined,
  isAuthenticated: false,
  session: {
    user: {
      name: '',
    },
    token: '',
  }
};

export const authReducer = (
  state: AuthState = initialState,
  action:
    | LoadTokenAction
    | SignInRequestAction
    | SignInSuccessAction
    | SignInFailureAction
    | SignOutSuccessAction
) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        error: undefined,
        session: undefined,
      };
    case AuthTypes.LOAD_TOKEN:
    case AuthTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        session: action.payload,
        isAuthenticated: true,
        error: undefined,
      };
    case AuthTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case AuthTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        session: undefined,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
