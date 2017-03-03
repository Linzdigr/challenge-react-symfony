import axios from 'axios'
import {
        CHANGE_CURRENT_ACCOUNT,
        CHANGE_CURRENT_SHEET,
        CHANGE_CURRENT_OPERATION
} from '../constants'

export const updateTitle = (n) => {
    const url = `${ROOT_URL}&q=${aParamYouMayNeed}`;
    const request = axios.get(url);

    return {
        type: FETCH_ACCOUNT,
        payload: request
    };
}

export const changeCurrentAccount = (id) => {
    return {
        type: CHANGE_CURRENT_ACCOUNT,
        payload: id
    }
}

export const changeCurrentSheet = (id) => {
    return {
        type: CHANGE_CURRENT_SHEET,
        payload: id
    }
}

export const changeCurrentOperation = (id) => {
    return {
        type: CHANGE_CURRENT_OPERATION,
        payload: id
    }
}
