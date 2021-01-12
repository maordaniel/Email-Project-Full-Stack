const initState = {
    isLogged: false,
};


const auth_reducers = (state = initState, action) =>{
    switch (action.type) {
        case "SUCCESS_LOGIN":
            return {...state, isLogged: true};
        case "SUCCESS_LOGOUT":
            return {...state, isLogged: false};
        default:
            return state
    }
};

export default auth_reducers;
