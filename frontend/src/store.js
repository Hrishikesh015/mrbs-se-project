import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { featureReducer } from '../src/reducers/featureReducer'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, getUserReducer } from '../src/reducers/userReducer'
import { meetingRoomDetailsReducer, meetingRoomReducer, meetingRoomAvailableReducer, meetingRoomBookingReducer, myMeetingListReducer, deleteMeetingReducer } from '../src/reducers/meetingRoomReducer'

const reducer = combineReducers({
    featureList: featureReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userReducer: getUserReducer,
    meetingRoomList: meetingRoomReducer,
    meetingRoomDetails: meetingRoomDetailsReducer,
    meetingRoomAvailable: meetingRoomAvailableReducer,
    meetingRoomBooking: meetingRoomBookingReducer,
    myMeetingList: myMeetingListReducer,
    deleteMeeting: deleteMeetingReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
}
const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store