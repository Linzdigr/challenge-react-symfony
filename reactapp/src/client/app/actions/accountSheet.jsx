import { INCREASE, DECREASE } from '../constants'

export function updateTitle(n) {
    return {
        type: ADD_ACCOUNT,
        amount: n
    }
}

export function decrease(n) {
    return {
        type: EDIT_ACCOUNT,
        amount: n
    }
}

export function decrease(n) {
    return {
        type: REMOVE_ACCOUNT,
        amount: n
    }
}
