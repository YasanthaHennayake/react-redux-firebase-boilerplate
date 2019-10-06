export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{
            console.log(resp);
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName, 
                email: newUser.email,
                designation: newUser.designation,
                uid: resp.user.uid 
            })
        }).then(() =>{
            return firestore.collection('invites').doc(newUser.inviteID).delete()
        }).then(()=>{
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch((err)=>{
            dispatch({type: 'SIGNUP_ERROR', err});
        });
    }
}

export const getInvite = (inviteID) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('invites').doc(inviteID).get()
            .then((doc) => {
                if (doc.exists) {
                    dispatch({ type: 'GET_INVITE_SUCCESS', payload: doc.data() });
                } else {
                    dispatch({ type: 'GET_INVITE_ERROR' });
                }
            })
    }
}

export const deleteUser = (UID) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('users').doc(UID).delete()
            .then(() => dispatch({ type: 'DELETE_USER_SUCCESS' }))
            .catch(err => dispatch({ type: 'DELETE_USER_ERROR', err }));
    }
}

export const resetPassword = (creds) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({type:'PASSWORD_RESET_STARTED'});
        const firebase = getFirebase();

        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(creds.email, creds.currentPassword);

        user.reauthenticateAndRetrieveDataWithCredential(cred)
        .then(()=>{
            return user.updatePassword(creds.newPassword);
        })
        .then(()=> dispatch({ type: 'PASSWORD_RESET_SUCCESS' }))
        .catch(err => dispatch({ type: 'PASSWORD_RESET_ERROR', err }));
    }
}