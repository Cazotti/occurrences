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
  payload: { message: OccurrenceError(error)},
});

interface OccurrenceCreateRequestAction extends Action<typeof OccurrenceTypes.CREATE_OCCURRENCE_REQUEST> {
  payload: Omit<OccurrenceData, 'id'>
}
export const occurrenceCreateRequestAction = (occurrence: Omit<OccurrenceData, 'id'>): OccurrenceCreateRequestAction => ({
  type: OccurrenceTypes.CREATE_OCCURRENCE_REQUEST,
  payload: occurrence,
});

interface OccurrenceCreateSuccessAction extends Action<typeof OccurrenceTypes.CREATE_OCCURRENCE_SUCCESS> {
  payload: OccurrenceData;
}
const occurrenceCreateSuccessAction = (occurrence: OccurrenceData): OccurrenceCreateSuccessAction => ({
  type: OccurrenceTypes.CREATE_OCCURRENCE_SUCCESS,
  payload: occurrence,
});

interface OccurrenceCreateFailureAction extends Action<typeof OccurrenceTypes.CREATE_OCCURRENCE_FAILURE> {
  payload: { message: String }
}
const occurrenceCreateFailureAction = (error: OccurrenceErrorAttributes): OccurrenceCreateFailureAction => ({
  type: OccurrenceTypes.CREATE_OCCURRENCE_FAILURE,
  payload: { message: OccurrenceError(error)},
});

interface OccurrenceUpdateRequestAction extends Action<typeof OccurrenceTypes.UPDATE_OCCURRENCE_REQUEST> {
  payload: OccurrenceData,
}
export const occurrenceUpdateRequestAction = (occurrence: OccurrenceData): OccurrenceUpdateRequestAction => ({
  type: OccurrenceTypes.UPDATE_OCCURRENCE_REQUEST,
  payload: occurrence,
});

interface OccurrenceUpdateSuccessAction extends Action<typeof OccurrenceTypes.UPDATE_OCCURRENCE_SUCCESS> {
  payload: OccurrenceData,
}
export const occurrenceUpdateSuccessAction = (occurrence: OccurrenceData): OccurrenceUpdateSuccessAction => ({
  type: OccurrenceTypes.UPDATE_OCCURRENCE_SUCCESS,
  payload: occurrence,
});

interface OccurrenceUpdateFailureAction extends Action<typeof OccurrenceTypes.UPDATE_OCCURRENCE_FAILURE> {
  payload: { message: String }
}
const occurrenceUpdateFailureAction = (error: OccurrenceErrorAttributes): OccurrenceUpdateFailureAction => ({
  type: OccurrenceTypes.UPDATE_OCCURRENCE_FAILURE,
  payload: { message: OccurrenceError(error)},
});

interface OccurrenceDeleteRequestAction extends Action<typeof OccurrenceTypes.DELETE_OCCURRENCE_REQUEST> {
  payload: OccurrenceData['id'],
}
export const occurrenceDeleteRequestAction = (occurrence: OccurrenceData['id']): OccurrenceDeleteRequestAction => ({
  type: OccurrenceTypes.DELETE_OCCURRENCE_REQUEST,
  payload: occurrence,
});

interface OccurrenceDeleteSuccessAction extends Action<typeof OccurrenceTypes.DELETE_OCCURRENCE_SUCCESS> {
  payload: OccurrenceData['id'],
}
export const occurrenceDeleteSuccessAction = (occurrenceId: OccurrenceData['id']): OccurrenceDeleteSuccessAction => ({
  type: OccurrenceTypes.DELETE_OCCURRENCE_SUCCESS,
  payload: occurrenceId
});

interface OccurrenceDeleteFailureAction extends Action<typeof OccurrenceTypes.DELETE_OCCURRENCE_FAILURE> {
  payload: { message: String },
}
const occurrenceDeleteFailureAction = (error: OccurrenceErrorAttributes): OccurrenceDeleteFailureAction => ({
  type: OccurrenceTypes.DELETE_OCCURRENCE_FAILURE,
  payload: { message: OccurrenceError(error)},
});

const occurrenceCreateEpic: AppEpic<
  OccurrenceCreateFailureAction | OccurrenceCreateRequestAction | OccurrenceCreateSuccessAction,
  OccurrenceCreateFailureAction | OccurrenceCreateSuccessAction
> = (action$, _, { occurrenceService }: {occurrenceService: OccurrenceService}) =>
  action$.pipe(
    filter(isOfType(OccurrenceTypes.CREATE_OCCURRENCE_REQUEST)),
    switchMap((action) =>
      occurrenceService.create(action.payload).pipe(
        map((res) => occurrenceCreateSuccessAction(res.body)),
        catchError((err) => of(occurrenceCreateFailureAction(err))),
      ),
    ),
  );

const occurrenceDeleteEpic: AppEpic<
  OccurrenceDeleteFailureAction | OccurrenceDeleteRequestAction | OccurrenceDeleteSuccessAction,
  OccurrenceDeleteFailureAction | OccurrenceDeleteSuccessAction
> = (action$, _, { occurrenceService }: {occurrenceService: OccurrenceService}) =>
  action$.pipe(
    filter(isOfType(OccurrenceTypes.DELETE_OCCURRENCE_REQUEST)),
    switchMap((action) =>
      occurrenceService.delete(action.payload).pipe(
        map(() => occurrenceDeleteSuccessAction(action.payload)),
        catchError((err) => of(occurrenceDeleteFailureAction(err))),
      ),
    ),
  );

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
      ),
    ),
  );

const occurrenceUpdateEpic: AppEpic<
  OccurrenceUpdateFailureAction | OccurrenceUpdateRequestAction | OccurrenceUpdateSuccessAction,
  OccurrenceUpdateFailureAction | OccurrenceUpdateSuccessAction
> = (action$, _, { occurrenceService }: {occurrenceService: OccurrenceService}) =>
  action$.pipe(
    filter(isOfType(OccurrenceTypes.UPDATE_OCCURRENCE_REQUEST)),
    switchMap((action) =>
      occurrenceService.update(action.payload).pipe(
        map((res) => occurrenceUpdateSuccessAction(res.body)),
        catchError(err => of(occurrenceUpdateFailureAction(err))),
      ),
    ),
  );

export const occurrenceEpic = combineEpics<AppEpic>(
  (occurrenceCreateEpic as any) as AppEpic,
  (occurrenceDeleteEpic as any) as AppEpic,
  occurrencesListEpic,
  (occurrenceUpdateEpic as any) as AppEpic,
);

const initialState: OccurrenceState = {
  error: undefined,
  data: [],
};

export const occurrenceReducer = (
  state: OccurrenceState = initialState,
  action:
    | OccurrenceCreateFailureAction
    | OccurrenceCreateRequestAction
    | OccurrenceCreateSuccessAction
    | OccurrenceDeleteFailureAction
    | OccurrenceDeleteRequestAction
    | OccurrenceDeleteSuccessAction
    | OccurrencesListFailureAction
    | OccurrencesListRequestAction
    | OccurrencesListSuccessAction
    | OccurrenceUpdateFailureAction
    | OccurrenceUpdateRequestAction
    | OccurrenceUpdateSuccessAction
) => {
  switch (action.type) {
    case OccurrenceTypes.CREATE_OCCURRENCE_FAILURE:
    case OccurrenceTypes.LIST_OCCURRENCES_FAILURE:
    case OccurrenceTypes.UPDATE_OCCURRENCE_FAILURE:
    case OccurrenceTypes.DELETE_OCCURRENCE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case OccurrenceTypes.CREATE_OCCURRENCE_REQUEST:
    case OccurrenceTypes.LIST_OCCURRENCES_REQUEST:
    case OccurrenceTypes.UPDATE_OCCURRENCE_REQUEST:
    case OccurrenceTypes.DELETE_OCCURRENCE_REQUEST:
      return {
        ...state,
        error: undefined,
      };
    case OccurrenceTypes.CREATE_OCCURRENCE_SUCCESS:
      return {
        ...state,
        data: [ ...state.data, action.payload ],
        error: undefined,
      };
    case OccurrenceTypes.LIST_OCCURRENCES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined,
      };
    case OccurrenceTypes.UPDATE_OCCURRENCE_SUCCESS:
      return {
        ...state,
        data: state.data.map((occurrence, ind, vector) => {
          if(occurrence.id !== action.payload.id) return occurrence
          else return ( vector.slice(ind, 1), action.payload ) }),
        error: undefined,
      };
    case OccurrenceTypes.DELETE_OCCURRENCE_SUCCESS:
      return {
        ...state,
        error: undefined,
        data: state.data.filter((occurrence) => occurrence.id !== action.payload),
      };
    default:
      return state;
  }
};

export default occurrenceReducer;
