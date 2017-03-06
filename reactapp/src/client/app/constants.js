export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT'
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'

export const CHANGE_CURRENT_ACCOUNT = 'CHANGE_CURRENT_ACCOUNT'
export const CHANGE_CURRENT_SHEET = 'CHANGE_CURRENT_SHEET'
export const CHANGE_CURRENT_OPERATION = 'CHANGE_CURRENT_OPERATION'

export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'
export const FETCH_ACCOUNT_PENDING = 'FETCH_ACCOUNT_PENDING'
export const FETCH_ACCOUNT_FULFILLED = 'FETCH_ACCOUNT_FULFILLED'
export const FETCH_ACCOUNT_REJECTED = 'FETCH_ACCOUNT_REJECTED'

export const FETCH_SHEET = 'FETCH_SHEET'
export const FETCH_SHEET_PENDING = 'FETCH_SHEET_PENDING'
export const FETCH_SHEET_FULFILLED = 'FETCH_SHEET_FULFILLED'
export const FETCH_SHEET_REJECTED = 'FETCH_SHEET_REJECTED'

export const FETCH_OPERATION = 'FETCH_OPERATION'
export const FETCH_OPERATION_PENDING = 'FETCH_OPERATION_PENDING'
export const FETCH_OPERATION_FULFILLED = 'FETCH_OPERATION_FULFILLED'
export const FETCH_OPERATION_REJECTED = 'FETCH_OPERATION_REJECTED'

export const CHANGE_OPERATION_COMMENT = 'CHANGE_OPERATION_COMMENT'
export const CHANGE_OPERATION_TITLE = 'CHANGE_OPERATION_TITLE'
export const CHANGE_OPERATION_TYPE = 'CHANGE_OPERATION_TYPE'
export const CHANGE_OPERATION_AMOUNT = 'CHANGE_OPERATION_AMOUNT'
export const CHANGE_OPERATION_CATEGORY = 'CHANGE_OPERATION_CATEGORY'

export const RESET_SHEET = 'RESET_SHEET'
export const RESET_OPERATION = 'RESET_OPERATION'

export const MODAL_VISIBILITY = 'MODAL_VISIBILITY'
export const MODAL_CONTEXT = 'MODAL_CONTEXT'

export const SNACKBAR_VISIBILITY = 'SNACKBAR_VISIBILITY'
export const SNACKBAR_CONTEXT = 'SNACKBAR_CONTEXT'

export const DEFAULT_APP_STATE = {
    modal: {
        visible: false,
        title: '',
        text: ''
    },
    snackbar: {
        text: '',
        visible: false
    },
    naviguation: {
        fetching: false,
        fetched: false,
        error: null,
        current_account: {
            id: 0
        },
        current_sheet: {
            id: 0
        },
        current_operation: {
            id: 0,
            label: '',
            type: "0",
            montant: '',
            comment: '',
            category: {
                id: 1,
                label: '',
                description: ''
            }
        }
    }
}
