const initialState = {
    loading: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_REQUEST":
            return { ...state, loading: true, error: null };
        case "AUTH_SUCCESS":
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case "AUTH_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};
