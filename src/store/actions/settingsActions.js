export const createNewInvite = (inviteData) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('invites').add({
            ...inviteData
        }).then(()=>{
            dispatch({
                type: 'CREATE_NEW_INVITE',
                inviteData
            });
        }).catch((err)=>{
            dispatch({
                type: 'CREATE_NEW_INVITE_ERROR',
                err
            })
        })
    }
}

export const updateInvite = (inviteID, inviteData) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('invites').doc(inviteID).set({
            ...inviteData
        }).then(()=>{
            dispatch({
                type: 'EDIT_INVITE',
                inviteData
            });
        }).catch((err)=>{
            dispatch({
                type: 'EDIT_INVITE_ERROR',
                err
            })
        })
    }
}

export const deleteInvite = (inviteID) => {
    return(dispatch, getState, {getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('invites').doc(inviteID).delete().then(()=>{
            dispatch({
                type: 'DELETE_INVITE'
            });
        }).catch((err)=>{
            dispatch({
                type: 'DELETE_INVITE_ERROR',
                err
            });
        });
    }
}

export const editUser = (uid, userData) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(uid).set({
            ...userData
        }).then(()=>{
            dispatch({
                type: 'EDIT_USER',
                userData
            })
        }).catch((err)=>{
            dispatch({
                type: 'EDIT_USER_ERROR',
                err
            })
        })
    }
}

export const deleteUser = (uid) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(uid).delete().then(()=>{
            dispatch({
                type: 'DELETE_USER'
            })
        }).catch((err)=>{
            dispatch({
                type: 'DELETE_USER_ERROR',
                err
            })
        })
    }
}
