import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_QUESTION = 'question/POST_QUESTION';
export const GET_QUESTION = 'question/GET_QUESTION';
export const GET_QUESTIONS = 'question/GET_QUESTIONS';
export const PUT_QUESTION = 'question/PUT_QUESTION';
export const GET_CLAIM = 'question/GET_CLAIM';

const actions = createActions({
    [POST_QUESTION]: () => {},
    [GET_QUESTION]: () => {},
    [GET_QUESTIONS]: () => {},
    [PUT_QUESTION]: () => {},
    [GET_CLAIM]: () => {}
});

/* 리듀서 */
const questionReducer = handleActions(
    {
        
        [POST_QUESTION]: (state, { payload }) => {

            return payload;
        },
        [GET_QUESTION]: (state, { payload }) => {
            
            return payload;
        },  
        [GET_QUESTIONS]: (state, { payload }) => {

            return payload;
        },
        [PUT_QUESTION]: (state, { payload }) => {

            return payload;
        },
        [GET_CLAIM]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default questionReducer;