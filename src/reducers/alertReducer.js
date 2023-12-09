import { 
    HIDE_ALERT,
    SHOW_ALERT
} from "../types"

//each reducer has a state
const initialAlert = {
    alert: null
}

export default function(state = initialAlert, action){
    switch(action.type){
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case HIDE_ALERT:
            return{
                ...state,
                alert: null
            }
        default:
            return state; 
    }
}