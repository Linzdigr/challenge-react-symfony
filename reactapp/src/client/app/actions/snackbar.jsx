import { SNACKBAR_CONTEXT, SNACKBAR_VISIBILITY } from '../constants'

export const changeSnackbarVisibility = (vis) => {
    return {
        type: SNACKBAR_VISIBILITY,
        payload: vis
    };
}

export const changeSnackbarContext = (text) => {
    return {
        type: SNACKBAR_CONTEXT,
        payload: {
            text
        }
    }
}
