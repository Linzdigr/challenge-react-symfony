import {
        CHANGE_CURRENT_ACCOUNT,
        CHANGE_CURRENT_SHEET,
        CHANGE_CURRENT_OPERATION,
        DEFAULT_APP_STATE
} from '../constants'

export default (state = DEFAULT_APP_STATE, action) => {
    switch(action.type){
        case CHANGE_CURRENT_ACCOUNT:
            return { ...state, current_account: action.payload }
        case CHANGE_CURRENT_SHEET:
            return { ...state, current_sheet: action.payload }
        case CHANGE_CURRENT_OPERATION:
            return { ...state, current_operation: action.payload }
    }

    return state;
}
