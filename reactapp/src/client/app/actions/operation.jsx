import axios from 'axios'
import {
    CHANGE_OPERATION_TITLE,
    CHANGE_OPERATION_COMMENT,
    CHANGE_OPERATION_TYPE,
    CHANGE_OPERATION_AMOUNT,
    CHANGE_OPERATION_CATEGORY
} from '../constants'

export const changeOperationComment = (str) => {
    return {
        type: CHANGE_OPERATION_COMMENT,
        payload: str
    };
}

export const changeOperationTitle = (str) => {
    return {
        type: CHANGE_OPERATION_TITLE,
        payload: str
    }
}

export const changeOperationType = (val) => {
    return {
        type: CHANGE_OPERATION_TYPE,
        payload: val
    }
}

export const changeOperationAmount = (val) => {
    return {
        type: CHANGE_OPERATION_AMOUNT,
        payload: val
    }
}

export const changeOperationCategory = (cat) => {
    return {
        type: CHANGE_OPERATION_CATEGORY,
        payload: cat
    }
}
