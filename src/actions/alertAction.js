
import { 
    HIDE_ALERT,
    SHOW_ALERT
} from "../types"

//show alert
export function showAlert(alert) {
    return (dispatch) => {
        dispatch(createAlert(alert))
    }
}

const createAlert = (alert) => ({
    type: SHOW_ALERT,
    payload: alert
})

export function hideAlertAction(alert) {
    return (dispatch) => {
        dispatch(hideAlert(alert))
    }
}

const hideAlert = (alert) => ({
    type: HIDE_ALERT
})
