import { MODAL_VISIBILITY, MODAL_CONTEXT } from '../constants'

export const changeModalVisibility = (vis) => {
    return {
        type: MODAL_VISIBILITY,
        payload: vis
    };
}

export const changeModalContext = (title, text) => {
    return {
        type: MODAL_CONTEXT,
        payload: {
            title,
            text
        }
    }
}
