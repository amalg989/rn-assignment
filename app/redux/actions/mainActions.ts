import {ACTIONS_MAIN} from '../../utilities/constants';

export function login(payload: any, callback: () => void) {
  return {
    type: ACTIONS_MAIN.LOGIN,
    payload,
    callback,
  };
}

export function getExperts() {
  return {
    type: ACTIONS_MAIN.GET_EXPERTS,
  };
}
export function getServices(payload: any) {
  return {
    type: ACTIONS_MAIN.GET_SERVICES,
    payload,
  };
}
