import { signupApi, loginApi } from "../../api/authApi";

export const signupAndLogin = (userData) => {
    return async (dispatch) => {
        dispatch({ type: "AUTH_REQUEST" });

        try {
            await signupApi(userData);
            const loginResult = await loginApi({
                email: userData.email,
                password: userData.password,
            });

            dispatch({
                type: "AUTH_SUCCESS",
                payload: loginResult,
            });

            localStorage.setItem("accessToken", loginResult.accessToken);
            localStorage.setItem("refreshToken", loginResult.refreshToken);
            localStorage.setItem("userInfo", JSON.stringify(loginResult.user));
        } catch (error) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: error.message,
            });
            throw error;
        }
    };
};

export const login = (credentials) => {
    return async (dispatch) => {
        dispatch({ type: "AUTH_REQUEST" });
        try {
            const loginResult = await loginApi(credentials);
            dispatch({ type: "AUTH_SUCCESS", payload: loginResult });
            localStorage.setItem("accessToken", loginResult.accessToken);
            localStorage.setItem("refreshToken", loginResult.refreshToken);
            localStorage.setItem("userInfo", JSON.stringify(loginResult.user));
        } catch (error) {
            dispatch({ type: "AUTH_FAILURE", payload: error.message });
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userInfo");
        dispatch({ type: "LOGOUT" });
    };
};
