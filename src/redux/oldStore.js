import { createStore } from "redux";

const initialState = {
    headerToDisplay: "",
    paragraphToDisplay: ""
}

export const UPDATE_HEADER = "UPDATE_HEADER";
export const UPDATE_PARAGRAPH = "UPDATE_PARAGRAPH";

function reducer(state = initialState, action){
    const {type, payload} =  action;
    switch(type){
        case UPDATE_HEADER:
            return{...state, headerToDisplay: payload};
        case UPDATE_PARAGRAPH:
            return{...state, paragraphToDisplay: payload};
        default:
            return state;
    }
}

export default createStore(reducer);