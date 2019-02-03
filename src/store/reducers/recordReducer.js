const initState = {};

const recordReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_RECORD':
            console.log('Created record ',action.record);
            return state;
        case 'CREATE_RECORD_ERROR':
            console.log('Error in creating record: ', action.err);
            return state;
        default:
            return state;
    }
}

export default recordReducer;