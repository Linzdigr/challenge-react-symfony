import axios as LoginActions from 'axios';

const APICalls = {
    getAccount(id) {
        axios.get(`/api/account/${id}`)
        .then(response => {
        if(response.status >= 200 && response.status < 300) {
            LoginActions.loginSuccess(response);
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        })
        .catch(error => { console.log('request failed', error); });
    },

    getSheet(account_id, sheet_id) {
        axios.get(`/api/account/${account_id}/sheet/${sheet_id}`)
    .then(response => {
        if(response.status >= 200 && response.status < 300) {
            LoginActions.loginSuccess(response);
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    })
    .catch(error => { console.log('request failed', error); });
    },

    getOperation(account_id, sheet_id, operation_id) {
        axios.get(`/api/account/${account_id}/sheet/${sheet_id}/operation/${operation_id}`)
    .then(response => {
        if(response.status >= 200 && response.status < 300) {
            LoginActions.loginSuccess(response);
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    })
    .catch(error => { console.log('request failed', error); });
    }
};

export default APICalls;
