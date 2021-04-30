import { Action, Middleware, Store } from 'redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { authReducer, authEpic } from './auth';
import { getAuthService, getOccurrenceService } from '../initializer';
import { occurrenceReducer, occurrenceEpic } from './occurrences';

const rootReducer = combineReducers({
  auth: authReducer,
  occurrence: occurrenceReducer,
});
export type RootReducer = typeof rootReducer;

const appReducer: RootReducer = (state, action: Action<any>) => {
  let newState = rootReducer(state, action as any);
  return newState;
};
export type RootState = ReturnType<typeof rootReducer>;

const epicDependencies = {
  authService: getAuthService(),
  occurrenceService: getOccurrenceService(),
};
export type AppEpicDependencies = typeof epicDependencies;

export type AppEpic<
  Input extends Action = Action,
  Output extends Input = Input
> = Epic<Input, Output, RootState, AppEpicDependencies>;

const rootEpic: AppEpic = (action$, state$, dep) =>
  combineEpics<AppEpic>(
    authEpic,
    occurrenceEpic,
  )(action$, state$, dep).pipe(
    catchError((error: Error) => {
      return throwError(error);
    }),
  );

export default function configureStore(): Store {
  const epicMiddleware = createEpicMiddleware<
    Action,
    Action,
    RootState,
    AppEpicDependencies
  >({ dependencies: epicDependencies })

  let middlewares: Middleware[] = [epicMiddleware];

  const store = createStore(appReducer, applyMiddleware(...middlewares))

  epicMiddleware.run(rootEpic);

  return store;
}
