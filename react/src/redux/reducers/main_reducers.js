const initState = {
    sender: null,
    receiver: null,
    reverseInput: false
};

const main_reducers = (state = initState, action) => {
    switch (action.type){
        case "SUCCESS_SET_SENDER":
            return state = {...state, sender: action.payload};
        case "SUCCESS_SET_RECEIVER":
            return state = {...state, receiver: action.payload};
        case "SUCCESS_SET_REVERSE_INPUT":
            return state = {...state, reverseInput: true};
        default:
            return state;
    }
};

export default main_reducers;
