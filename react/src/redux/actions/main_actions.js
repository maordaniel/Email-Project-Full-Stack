export const setSenderInput = sender => dispatch =>{
    dispatch({
        type: "SUCCESS_SET_SENDER",
        payload: sender
    })
};

export const setReceiverInput = receiver => dispatch =>{
    dispatch({
        type: "SUCCESS_SET_RECEIVER",
        payload: receiver
    })
};

export const setReverseInput = val => dispatch =>{
    dispatch({
        type: "SUCCESS_SET_REVERSE_INPUT",
        payload: val
    })
};