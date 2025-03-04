import axios from "axios";

export const getUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "GET_USER_REQUEST"
        });

        const token = localStorage.getItem("token");
        console.log(token);

        const { data } = await axios.get("http://localhost:8080/api/v1/user", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "GET_USER_SUCCESS",
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: "GET_USER_FAILURE",
            payload: error.response?.data?.message || error.message,
        });

    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LOGIN_REQUEST",
        });

        const { data } = await axios.post(
            "http://localhost:8080/api/v1/login",
            {
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Login Response:", data);

        // Check if token exists in the response data
        if (data.token) {
            // Store the token in localStorage
            localStorage.setItem("token", data.token);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: data.message,
            });
        } else {
            throw new Error("Token not found in response");
        }
    } catch (error) {
        dispatch({
            type: "LOGIN_FAILURE",
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "LOGOUT_REQUEST",
        });

        const { data } = await axios.get("http://localhost:8080/api/v1/logout");

        // Remove the token from localStorage
        localStorage.removeItem("token");

        dispatch({
            type: "LOGOUT_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "LOGOUT_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LOAD_USER_REQUEST",
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.get("http://localhost:8080/api/v1/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LOAD_USER_FAILURE",
            payload: error.response.data.message,
        });
    }
};



export const updateUser =
    (name, email, password, skills, about) => async (dispatch) => {
        try {
            dispatch({
                type: "UPDATE_USER_REQUEST",
            });

            const token = localStorage.getItem("token");

            const { data } = await axios.put(
                "http://localhost:8080/api/v1/admin/update",
                {
                    name,
                    email,
                    password,
                    skills,
                    about,
                },

                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                },

            );

            dispatch({
                type: "UPDATE_USER_SUCCESS",
                payload: data.message,
            });
        } catch (error) {
            dispatch({
                type: "UPDATE_USER_FAILURE",
                payload: error.response.data.message,
            });
        }
    };


export const addTimeline = (title, description, date) => async (dispatch) => {
    try {
        dispatch({
            type: "ADD_TIMELINE_REQUEST",
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.post(
            "http://localhost:8080/api/v1/admin/timeline/add",
            {
                title,
                description,
                date
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            },

        );

        dispatch({
            type: "ADD_TIMELINE_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "ADD_TIMELINE_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const deleteTimeline = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "DELETE_TIMELINE_REQUEST",
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.delete(
            `http://localhost:8080/api/v1/admin/timeline/${id}`,

            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            },

        );

        dispatch({
            type: "DELETE_TIMELINE_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "DELETE_TIMELINE_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const addYoutube = (title, url, image) => async (dispatch) => {
    try {
        dispatch({
            type: "ADD_YOUTUBE_REQUEST",
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.post(
            "http://localhost:8080/api/v1/admin/youtube/add",
            {
                title,
                url,
                image
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            },

        );

        dispatch({
            type: "ADD_YOUTUBE_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "ADD_YOUTUBE_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const deleteYoutube = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "DELETE_YOUTUBE_REQUEST",
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.delete(
            `http://localhost:8080/api/v1/admin/youtube/${id}`,

            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            },

        );

        dispatch({
            type: "DELETE_YOUTUBE_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "DELETE_YOUTUBE_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const addProject = (title, url, image, description, techStack) => async (dispatch) => {
    try {
        dispatch({
            type: "ADD_PROJECT_REQUEST",
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.post(
            "http://localhost:8080/api/v1/admin/project/add",
            {

                title,
                url,
                image,
                description,
                techStack
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            },

        );

        dispatch({
            type: "ADD_PROJECT_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "ADD_PROJECT_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "DELETE_PROJECT_REQUEST",
        });

        const token = localStorage.getItem("token");

        const { data } = await axios.delete(
            `http://localhost:8080/api/v1/admin/project/${id}`,

            {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            },

        );

        dispatch({
            type: "DELETE_PROJECT_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "DELETE_PROJECT_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const contactUs = (name, email, message) => async (dispatch) => {
    try {
        dispatch({
            type: "CONTACT_US_REQUEST",
        });

        // const token = localStorage.getItem("token");

        const { data } = await axios.post(
            "http://localhost:8080/api/v1/contact",
            {
                name,
                email,
                message
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                },
            },

        );

        dispatch({
            type: "CONTACT_US_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "CONTACT_US_FAILURE",
            payload: error.response.data.message,
        });
    }
};




