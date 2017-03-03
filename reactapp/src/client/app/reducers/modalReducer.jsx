import {
        MODAL_VISIBILITY,
        MODAL_CONTEXT,
        DEFAULT_APP_STATE
} from '../constants'

export default (state = DEFAULT_APP_STATE, action) => {
    switch(action.type){
        case MODAL_VISIBILITY:
            if(action.payload === true){
                return { ...state, visible: true }
            }
            else if(action.payload === false){
                return { ...state, visible: false }
            }
        case MODAL_CONTEXT:
            if(typeof action.payload.title === 'string' && typeof action.payload.title === 'string')
                return { ...state, title: action.payload.title, text: action.payload.text }
    }

    return state;
}
