import {createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_COMPANYINFO = 'footer/GET_COMPANYINFO';
export const GET_SHOPINFO = 'footer/GET_SHOPINFO';

const actions = createActions({
    [GET_COMPANYINFO] : () => {},
    [GET_SHOPINFO] : () => {}
});

const footerReducer = handleActions(
    {
        [GET_COMPANYINFO] : (state, { payload }) => {
            return payload;
        },
        [GET_SHOPINFO] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default footerReducer;