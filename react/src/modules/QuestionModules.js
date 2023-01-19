import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_QUESTION          = 'question/POST_QUESTION';
export const GET_QUESTION          = 'question/GET_QUESTION';

const actions = createActions({
    [POST_QUESTION]: () => {},
    [GET_QUESTION]: () => {}
});

/* 리듀서 */
const questionReducer = handleActions(
    {
        
        [POST_QUESTION]: (state, { payload }) => {

            return payload;
        },
        [GET_QUESTION]: (state, { payload }) => {

            return payload;
        }    
    },
    initialState
);

export default questionReducer;