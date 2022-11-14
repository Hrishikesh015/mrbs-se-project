import {
    FEATURE_LIST_REQUEST,
    FEATURE_LIST_SUCCESS,
    FEATURE_LIST_FAIL
} from '../constants/featureConstants'

export const featureReducer = (state = { features: [] }, action) => {
    switch (action.type) {
        case FEATURE_LIST_REQUEST:
            return { ...state, loading: true }
        case FEATURE_LIST_SUCCESS:
            return { loading: false, features: action.payload }
        case FEATURE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}