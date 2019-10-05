import authReduder from './authReducer';
import recordReducer from './recordReducer';
import settingsReducer from './settingsReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReduder,
    record: recordReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    settings: settingsReducer
})

export default rootReducer;