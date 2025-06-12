const API_BASE_URL = "http://streaming.nexlesoft.com:3001";

export const signupApi = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Signup failed.");
        }

        const data = await response.json();

        return {
            success: true,
            message: "Signup successful!",
            user: data,
        };
    } catch (error) {
        return Promise.reject({
            success: false,
            message: error.message || "Signup failed.",
        });
    }
};

export const loginApi = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed.");
        }

        const data = await response.json();
        return {
            success: true,
            message: "Login successful!",
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    } catch (error) {
        return Promise.reject({
            success: false,
            message: error.message || "Login failed.",
        });
    }
};

export const logoutApi = async (accessToken, refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/signout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (response.status === 204) {
        return { success: true };
    } else {
        const errorText = await response.text();
        throw new Error(`Logout failed: ${response.status} - ${errorText}`);
    }
};
