import { all, take, put, call, fork } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_CART_ITEMS,
  SET_CURRENT_USER,
  SET_ITEM_DETAILS,
  setItemPrice
} from '../actions';

function* fetchItemPrice(itemId, currency) {
  const response = yield fetch(`http://localhost:8081/prices/${currency}/${itemId}`);
  const json = yield response.json();
  const price = json[0].price;

  yield put(setItemPrice(itemId, price));
}

export function* itemPriceSaga() {
  const [{ user }, { items }] = yield all([
    take(SET_CURRENT_USER),
    take(SET_CART_ITEMS)
  ]);

  yield items.map(item => call(fetchItemPrice, item.id, user.country));
}
