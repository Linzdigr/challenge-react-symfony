import {
        FETCH_ACCOUNT_PENDING ,
        FETCH_ACCOUNT_FULFILLED,
        FETCH_ACCOUNT_REJECTED,

        FETCH_SHEET_PENDING ,
        FETCH_SHEET_FULFILLED,
        FETCH_SHEET_REJECTED,

        FETCH_OPERATION_PENDING ,
        FETCH_OPERATION_FULFILLED,
        FETCH_OPERATION_REJECTED,

        CHANGE_OPERATION_TITLE,
        CHANGE_OPERATION_TYPE,
        CHANGE_OPERATION_COMMENT,
        CHANGE_OPERATION_AMOUNT,
        CHANGE_OPERATION_CATEGORY,

        RESET_SHEET,
        RESET_OPERATION,

        DEFAULT_APP_STATE
} from '../constants'

export default (state = DEFAULT_APP_STATE.naviguation, action) => {
    switch(action.type){
        case RESET_OPERATION: {
            var default_op = DEFAULT_APP_STATE.naviguation.current_operation;
            return {...state, current_operation: default_op }
            break;
        }
        case RESET_SHEET: {
            return {...state, current_sheet: { id: 0 }}
            break;
        }
        case FETCH_ACCOUNT_PENDING: {
            return {...state, fetching: true}
            break;
        }
        case FETCH_ACCOUNT_REJECTED: {
            return {...state, fetching: false, error: action.payload}
            break;
        }
        case FETCH_ACCOUNT_FULFILLED: {
            debugger;
            return {
                ...state,
                fetching: false,
                fetched: true,
                current_account: action.payload.data
            }
            break;
        }
        case FETCH_SHEET_PENDING: {
            return {...state, fetching: true}
            break;
        }
        case FETCH_SHEET_REJECTED: {
            return {...state, fetching: false, error: action.payload}
            break;
        }
        case FETCH_SHEET_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                current_sheet: action.payload.data
            }
            break;
        }
        case FETCH_OPERATION_PENDING: {
            return {...state, fetching: true}
            break;
        }
        case FETCH_OPERATION_REJECTED: {
            return {...state, fetching: false, error: action.payload}
            break;
        }
        case FETCH_OPERATION_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                current_operation: action.payload.data
            }
            break;
        }
        case CHANGE_OPERATION_COMMENT: {
            return {...state, current_operation: { ...state.current_operation, comment: action.payload } }
            break;
        }
        case CHANGE_OPERATION_TITLE: {
            return {...state, current_operation: { ...state.current_operation, label: action.payload } }
            break;
        }
        case CHANGE_OPERATION_TYPE: {
            return {...state, current_operation: { ...state.current_operation, type: action.payload } }
            break;
        }
        case CHANGE_OPERATION_AMOUNT: {
            return {...state, current_operation: { ...state.current_operation, montant: action.payload } }
            break;
        }
        case CHANGE_OPERATION_CATEGORY: {
            return {...state, current_operation: { ...state.current_operation, category: action.payload } }
            break;
        }
    }

    return state;
}
