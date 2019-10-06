const initState = {}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login error');
            return {
                ...state,
                authError: 'Login error'
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('Signup success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            console.log('Signup error');
            return {
                ...state,
                authError: action.err.message
            }
        case 'GET_INVITE_SUCCESS':
            console.log(`Invite data successfully recieved. Data:`, action.payload);
            return {
                ...state,
                inviteData: {
                    data: action.payload,
                    status: true
                }

            }
        case 'GET_INVITE_ERROR':
            console.log(`Error in getting invite data. Invalid invite ID`);
            return {
                ...state,
                inviteData: {
                    data: null,
                    status: false
                }
            }
        case 'PASSWORD_RESET_STARTED':
            console.log('Password reset started');
            return {
                ...state,
                passwordReset: {
                    processing: true,
                    success: null,
                    err: null
                }
            }
        case 'PASSWORD_RESET_SUCCESS':
            console.log('Password reset success');
            return {
                ...state,
                passwordReset: {
                    processing: false,
                    success: true,
                    err: null
                }
            }
        case 'PASSWORD_RESET_ERROR':
            console.log('Password reset failiure', action.err.message);
            return {
                ...state,
                passwordReset: {
                    processing: false,
                    success: false,
                    err: action.err.message
                }
            }
        default:
            return state;
    }
}

export default authReducer;