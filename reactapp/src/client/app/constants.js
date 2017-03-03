export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT'
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'
export const CHANGE_CURRENT_ACCOUNT = 'CHANGE_CURRENT_ACCOUNT'
export const CHANGE_CURRENT_SHEET = 'CHANGE_CURRENT_SHEET'
export const CHANGE_CURRENT_OPERATION = 'CHANGE_CURRENT_OPERATION'
export const MODAL_VISIBILITY = 'MODAL_VISIBILITY'
export const MODAL_CONTEXT = 'MODAL_CONTEXT'

export const DEFAULT_APP_STATE = {
    modal: {
        visible: false,
        title: '',
        text: ''
    },
    naviguation: {
        current_account: 0,
        current_sheet: 0,
        current_operation: 0
    }
}
