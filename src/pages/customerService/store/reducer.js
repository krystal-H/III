import { fromJS } from 'immutable';

export const SHOWCUSTOMERSERVICE = 'SHOWCUSTOMERSERVICE';

export const showCustomerService= statu => {
  return {
    type: SHOWCUSTOMERSERVICE,
    statu
  }
}

const defaultState = fromJS({
  showCustomerService:false
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case SHOWCUSTOMERSERVICE:
      return state.set('showCustomerService',action.statu || false)
    default:
      return state;
  }
}