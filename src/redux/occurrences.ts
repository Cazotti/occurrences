import { Action } from 'redux';
import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import OccurrenceData from '../data-types/occurrence-data';

import { OccurrenceTypes } from '../enums/occurrence-types.enum';
import { OccurrenceError, OccurrenceErrorAttributes } from '../errors/component/occurrence.redux';
import { OccurrenceService } from '../services/occurrence.service';
import { AppEpic } from './store';

export interface OccurrenceState {
  error?: Error,
  data: OccurrenceData[],
}

interface OccurrencesListRequestAction extends Action<typeof OccurrenceTypes.LIST_OCCURRENCES_REQUEST> {}
export const occurrencesListRequestAction = (): OccurrencesListRequestAction => ({
  type: OccurrenceTypes.LIST_OCCURRENCES_REQUEST,
});

interface OccurrencesListSuccessAction extends Action<typeof OccurrenceTypes.LIST_OCCURRENCES_SUCCESS> {
  payload: OccurrenceData[];
}
const occurrencesListSuccessAction = (occurrences: OccurrenceData[]): OccurrencesListSuccessAction => ({
  type: OccurrenceTypes.LIST_OCCURRENCES_SUCCESS,
  payload: occurrences,
});

interface OccurrencesListFailureAction extends Action<typeof OccurrenceTypes.LIST_OCCURRENCES_FAILURE> {
  payload: { message: String }
}
const occurrencesListFailureAction = (error: OccurrenceErrorAttributes): OccurrencesListFailureAction => ({
  type: OccurrenceTypes.LIST_OCCURRENCES_FAILURE,
  payload: { message: OccurrenceError(error)}
});

const occurrencesListEpic: AppEpic<
  OccurrencesListFailureAction | OccurrencesListRequestAction | OccurrencesListSuccessAction,
  OccurrencesListFailureAction | OccurrencesListSuccessAction
> = (action$, _, { occurrenceService }: {occurrenceService: OccurrenceService}) =>
  action$.pipe(
    filter(isOfType(OccurrenceTypes.LIST_OCCURRENCES_REQUEST)),
    switchMap(() =>
      occurrenceService.listAll().pipe(
        map((res) => occurrencesListSuccessAction(res.body)),
        catchError((err) => of(occurrencesListFailureAction(err))),
      )
    ),
  )

export const occurrenceEpic = combineEpics<AppEpic>( occurrencesListEpic );

const initialState: OccurrenceState = {
  error: undefined,
  data: [],
};

export const occurrenceReducer = (
  state: OccurrenceState = initialState,
  action:
    | OccurrencesListRequestAction
    | OccurrencesListFailureAction
    | OccurrencesListSuccessAction
) => {
  switch (action.type) {
    case OccurrenceTypes.LIST_OCCURRENCES_REQUEST:
      return {
        ...state,
        data: [],
        error: undefined,
      };
    case OccurrenceTypes.LIST_OCCURRENCES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case OccurrenceTypes.LIST_OCCURRENCES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined,
      };
    default:
      return state;
  }
};

export default occurrenceReducer;
