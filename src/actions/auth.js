import { types } from "../types/types"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";


//?Middlewares

export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                console.log(user);
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
    }
}

export const startRegisterWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user}) => {
                await updateProfile(user, {displayName: name});
                console.log(user);
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch((e)=> {
                console.log(e)
            })
    }
}
 
export const startGoogleLogin = () =>{
    //? callback
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid, displayName
        }
    }
)
