import { makeActionCreator } from '../utility';

export const SET_CHECKOUT_PHASE = 'SET_CHECKOUT_PHASE';
export const QUANTITY_VERIFICATION_CHECKOUT_PHASE = 'QUANTITY_VERIFICATION_CHECKOUT_PHASE';
export const CREDIT_VALIDATION_CHECKOUT_PHASE = 'CREDIT_VALIDATION_CHECKOUT_PHASE';
export const PURCHASE_FINALIZATION_CHECKOUT_PHASE = 'PURCHASE_FINALIZATION_CHECKOUT_PHASE';
export const ERROR_CHECKOUT_PHASE = 'ERROR_CHECKOUT_PHASE';
export const SUCCESS_CHECKOUT_PHASE = 'SUCCESS_CHECKOUT_PHASE';
export const setCheckoutPhase = makeActionCreator(SET_CHECKOUT_PHASE, 'phase');
