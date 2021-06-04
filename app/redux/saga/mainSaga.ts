import {Alert} from 'react-native';
import {call, put, select, takeLeading} from 'redux-saga/effects';
import {ACTIONS_MAIN} from '../../utilities/constants';

const stateHelper = (state: any) => state.main;

function* userLogin(actions: any): any {
  const {payload, callback} = actions;
  yield put({type: ACTIONS_MAIN.LOGIN_REQUEST});

  let data = {
    method: 'POST',
    body: JSON.stringify({
      email: payload.emailAddress,
      password: payload.password,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const fetchApi = (_payload: RequestInit | undefined) =>
    fetch('https://stage-api.serw.io/v1/auth/local/login', _payload);

  try {
    const response: Response = yield call(fetchApi, data);
    const json = yield response.json();

    if (!json.statusCode && json.customerAccessToken) {
      yield put({type: ACTIONS_MAIN.LOGIN_REQUEST_SUCCESS, payload: json});
      if (callback) {
        callback();
      }
    } else {
      Alert.alert(
        'Login Failed',
        'Invalid email and/or password. Please try again.',
      );
      yield put({type: ACTIONS_MAIN.LOGIN_REQUEST_FAILED});
    }
  } catch {
    Alert.alert('Login Failed', 'Something went wrong. Please try again.');
  }
}

function* getExpertsList(): any {
  yield put({type: ACTIONS_MAIN.GET_EXPERTS});

  let data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const fetchApi = (_payload: RequestInit | undefined) =>
    fetch('https://stage-api.serw.io/v1/experts', _payload);

  try {
    const response: Response = yield call(fetchApi, data);
    const json = yield response.json();

    if (json.experts) {
      yield put({
        type: ACTIONS_MAIN.GET_EXPERTS_SUCCESS,
        payload: json.experts,
      });
    } else {
      yield put({type: ACTIONS_MAIN.GET_EXPERTS_FAILED});
    }
  } catch {
    //
  }
}

function* getServicesList(action: any): any {
  yield put({type: ACTIONS_MAIN.GET_SERVICES});
  const mainState = yield select(stateHelper);

  let data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const skip = !action.payload.nextStep ? 0 : mainState.skipServices + 10;
  const take = 10;

  const fetchApi = (_payload: RequestInit | undefined) =>
    fetch(
      `https://stage-api.serw.io/v1/services?skip=${skip}&take=${take}`,
      _payload,
    );

  try {
    const response: Response = yield call(fetchApi, data);
    const json = yield response.json();

    if (json.services) {
      yield put({
        type: ACTIONS_MAIN.GET_SERVICES_SUCCESS,
        payload: {services: json.services, skipServices: skip},
      });
    } else {
      yield put({type: ACTIONS_MAIN.GET_SERVICES_FAILED});
    }
  } catch {
    //
  }
}

export default function* mainSaga() {
  yield takeLeading(ACTIONS_MAIN.LOGIN, userLogin);
  yield takeLeading(ACTIONS_MAIN.GET_EXPERTS, getExpertsList);
  yield takeLeading(ACTIONS_MAIN.GET_SERVICES, getServicesList);
}
