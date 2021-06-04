import {ACTIONS_MAIN} from '../../utilities/constants';

const INIT_STATE = {
  loader: false,
  user: null,
  expertsList: null,
  servicesList: null,
  skipServices: 0,
};

export default (state = INIT_STATE, action: any): any => {
  switch (action.type) {
    case ACTIONS_MAIN.LOGIN_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case ACTIONS_MAIN.LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loader: false,
        expertsList: null,
      };
    case ACTIONS_MAIN.GET_EXPERTS_FAILED:
      return {
        ...state,
        loader: false,
      };
    case ACTIONS_MAIN.GET_SERVICES_FAILED:
      return {
        ...state,
        loader: false,
      };
    case ACTIONS_MAIN.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loader: false,
        user: action.payload,
      };
    case ACTIONS_MAIN.GET_EXPERTS_SUCCESS:
      return {
        ...state,
        loader: false,
        expertsList: action.payload,
      };
    case ACTIONS_MAIN.GET_SERVICES_SUCCESS:
      return {
        ...state,
        loader: false,
        skipServices: action.payload.skipServices,
        servicesList: (state.servicesList || []).concat(
          action.payload.services,
        ),
      };
    default:
      return state;
  }
};
