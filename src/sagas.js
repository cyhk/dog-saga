import {  
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE
} from './actionTypes';

import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// using takeLatest here so we trigger a new workerSaga when
// we receive a API_CALL_REQUEST and cancel all previous ones
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// attempt to fetch a dog and dispatch the appropriate
// action depending on whether an error was thrown
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    yield put({ type: API_CALL_SUCCESS, dog });
  } catch (error) {
    yield put({ type: API_CALL_FAILURE, error });
  }
}

// not awaiting here, we will get a Promise
function fetchDog() {
  return axios.get('https://dog.ceo/api/bree/image/random');
}