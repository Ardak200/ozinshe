
const defaultState = {
    user: null,
    loggedIn: false,
    authenticatingUser: false,
    failedLogin: false,
    error: null,
};

const usersReducer = /* FUNCTION */ (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            // action.payload {username: 'Chandler Bing', bio: 'my user bio', avatar: 'some image url'}
            return {
                ...state, user: action.payload, loggedIn: true, authenticatingUser: false,
            };
        case 'AUTHENTICATING_USER': // tells the app we're fetching
            return { ...state, failedLogin: false, authenticatingUser: true };
        case 'AUTHENTICATED_USER':
            return { ...state, authenticatingUser: false };
        case 'FAILED_LOGIN': // for error handling
            return {
                ...state,
                failedLogin: true,
                error: action.payload,
                authenticatingUser: false,
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                loggedIn: false,
                authenticatingUser: false,
                failedLogin: false,
                error: null,
            };
        default:
            return state;
    }
};

export default usersReducer;