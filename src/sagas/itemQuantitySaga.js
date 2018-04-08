import { takeLatest, put, call, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  FETCHING,
  FETCHED,
  setItemQuantityFetchStatus,
  decreaseItemQuantity
} from '../actions';

import { currentUserSelector } from '../selectors';

export function* handleIncreaseItemQuantity({ id }) {
  yield put(setItemQuantityFetchStatus(FETCHING));
  const user = yield select(currentUserSelector);
  const response = yield call(fetch, `http://localhost:8081/cart/add/${user.get('id')}/${id}`);

  if (response.status !== 200) {
    yield put(decreaseItemQuantity(id, true));
    alert('Sorry. There weren\'t enought items in stock to complete your request!');
  }

  yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* handleDecreaseItemQuantity({ id, local }) {
  if (local) {
    return;
  }

  yield put(setItemQuantityFetchStatus(FETCHING));
  const user = yield select(currentUserSelector);
  const response = yield call(fetch, `http://localhost:8081/cart/remove/${user.get('id')}/${id}`);

  if (response.status !== 200) {
    yield put(decreaseItemQuantity(id, true));
    console.warn('Received non 200 status: ', response);
  }

  yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga() {
  yield [
    takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
    takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
  ];
}
