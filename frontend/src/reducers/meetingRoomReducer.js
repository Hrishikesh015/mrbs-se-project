import {
    MEETING_ROOM_LIST_REQUEST,
    MEETING_ROOM_LIST_SUCCESS,
    MEETING_ROOM_LIST_FAIL,
    MEETING_ROOM_DETAILS_REQUEST,
    MEETING_ROOM_DETAILS_SUCCESS,
    MEETING_ROOM_DETAILS_FAIL,
    MEETING_ROOM_AVAILABILITY_REQUEST,
    MEETING_ROOM_AVAILABILITY_SUCCESS,
    MEETING_ROOM_AVAILABILITY_FAIL,
    MEETING_ROOM_AVAILABILITY_RESET,
    MEETING_ROOM_BOOKING_REQUEST,
    MEETING_ROOM_BOOKING_SUCCESS,
    MEETING_ROOM_BOOKING_FAIL,
    MY_MEETINGS_REQUEST,
    MY_MEETINGS_SUCCESS,
    MY_MEETINGS_FAIL,
    MY_MEETINGS_RESET,
    DELETE_MEETING_REQUEST,
    DELETE_MEETING_SUCCESS,
    DELETE_MEETING_FAIL
} from '../constants/meetingRoomConstants'

export const meetingRoomReducer = (state = { meetingRooms: [] }, action) => {
    switch (action.type) {
        case MEETING_ROOM_LIST_REQUEST:
            return { ...state, loading: true }
        case MEETING_ROOM_LIST_SUCCESS:
            return { loading: false, meetingRooms: action.payload }
        case MEETING_ROOM_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const meetingRoomDetailsReducer = (state = { meetingRoom: {} }, action) => {
    switch (action.type) {
        case MEETING_ROOM_DETAILS_REQUEST:
            return { loading: true, ...state };
        case MEETING_ROOM_DETAILS_SUCCESS:
            return { loading: false, meetingRoom: action.payload }
        case MEETING_ROOM_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const meetingRoomAvailableReducer = (state = {}, action) => {
    switch (action.type) {
        case MEETING_ROOM_AVAILABILITY_REQUEST:
            return { ...state, loadingAvailability: true };
        case MEETING_ROOM_AVAILABILITY_SUCCESS:
            return { loadingAvailability: false, available: action.payload }
        case MEETING_ROOM_AVAILABILITY_FAIL:
            return {}
        case MEETING_ROOM_AVAILABILITY_RESET:
            return {}
        default:
            return state;
    }
}

export const meetingRoomBookingReducer = (state = {}, action) => {
    switch (action.type) {
        case MEETING_ROOM_BOOKING_REQUEST:
            return { ...state };
        case MEETING_ROOM_BOOKING_SUCCESS:
            return { success: true, updatedMeetingRoom: action.payload }
        case MEETING_ROOM_BOOKING_FAIL:
            return { error: action.payload }
        default:
            return state;
    }
}

export const myMeetingListReducer = (state = { loaded: false, myMeetings: [] }, action) => {
    switch (action.type) {
        case MY_MEETINGS_REQUEST:
            return { loaded: true, loadingMyMeetings: true };
        case MY_MEETINGS_SUCCESS:
            return { loadingMyMeetings: false, myMeetings: action.payload }
        case MY_MEETINGS_FAIL:
            return { error: action.payload }
        case MY_MEETINGS_RESET:
            return { loaded: false, myMeetings: []  }
        default:
            return state;
    }
}

export const deleteMeetingReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_MEETING_REQUEST:
            return { ...state };
        case DELETE_MEETING_SUCCESS:
            return { deleteMeeting: true }
        case DELETE_MEETING_FAIL:
            return { error: action.payload }
        default:
            return state;
    }
}