import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import { connect } from './../createSocketConnection';
import { setCustomerServiceAvailability } from './../actions';

export function* customerServiceAvailabilitySaga() {
  const socket = connect();
  const channel = new eventChannel(emit => {
    const enableSupportMessage = () => {
      emit(true);
    };

    const disableSupportMessage = () => {
      emit(false);
    };

    socket.on('SUPPORT_AVAILABLE', enableSupportMessage);
    socket.on('SUPPORT_NOT_AVAILABLE', disableSupportMessage);

    return () => {};
  });

  while(true) {
    const supportAvailable = yield take(channel);
    yield put(setCustomerServiceAvailability(supportAvailable));
  }
}
