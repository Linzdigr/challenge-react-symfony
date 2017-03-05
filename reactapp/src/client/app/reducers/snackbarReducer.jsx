import {
        SNACKBAR_VISIBILITY,
        SNACKBAR_CONTEXT,
        DEFAULT_APP_STATE
} from '../constants'

export default (state = DEFAULT_APP_STATE.snackbar, action) => {
    switch(action.type){
        case SNACKBAR_VISIBILITY:
            if(action.payload === true){
                return { ...state, visible: true }
            }
            else if(action.payload === false){
                return { ...state, visible: false }
            }
        case SNACKBAR_CONTEXT:
            if(typeof action.payload.text === 'string')
                return { ...state, text: action.payload.text }
    }

    return state;
}
