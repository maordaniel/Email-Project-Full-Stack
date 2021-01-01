export const login = () => dispatch => {
    dispatch({
        type: "SUCCESS_LOGIN",
    })
};


export const logout = () => dispatch => {
    dispatch({
        type: "SUCCESS_LOGOUT",
    })
};
