const initState = {}

const settingsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_NEW_INVITE':
            console.log('New invite added ', action.inviteData);
            return state;
        case 'CREATE_NEW_INVITE_ERROR':
            console.log('Error in adding new invite', action.err);
            return state;
        case 'DELETE_INVITE':
            console.log('Invite successfully deleted');
            return state;
        case 'DELETE_INVITE_ERROR':
            console.log('Error in deleting invite ', action.err);
            return state;
        case 'EDIT_INVITE':
            console.log('Invite edited successfully');
            return state;
        case 'EDIT_INVITE_ERROR':
            console.log('Error in editing invite', action.err);
            return state;
        case 'EDIT_USER':
            console.log('User edited successfully');
            return state;
        case 'EDIT_USER_ERROR':
            console.log('Error in editing user', action.err);
            return state;
        case 'DELETE_USER':
            console.log('User deleted successfully');
            return state;
        case 'DELETE_USER_ERROR':
            console.log('Error in deleting error', action.err);
            return state;
        default:
            return state;
    }
}

export default settingsReducer