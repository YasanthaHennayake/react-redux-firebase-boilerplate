export const createRecord = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //Make async call to database
        const firestore = getFirestore();
        firestore.collection('records').add({
            ...record
        }).then(()=> {
            dispatch({
                type: 'CREATE_RECORD',
                record
            });
        }).catch((err)=>{
            dispatch({
                type: 'CREATE_RECORD_ERROR',
                err
            })
        })
    }
}