import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { login } from '../actions/auth'
import { setNote } from '../actions/notes'
import { JournalScreen } from '../components/journal/JournalScreen'
import { loadNotes } from '../helpers/loadNote'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
    //? Aquí se captura el estado del úlyimo logueado por parte de firebase
    const auth = getAuth();

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth,async (user)=> {
            console.log({user});
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setisLoggedIn(true);
                const notes = await loadNotes(user.uid);
                dispatch(setNote(notes));
            }else{
                setisLoggedIn(false);
            }
            setChecking(false);
        })
    }, [dispatch, setChecking, setisLoggedIn])

    if(checking) {
        return (
            <h1>Please Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={isLoggedIn} path={'/auth'} component={AuthRouter} />
                    <PrivateRoute isAuthenticated={isLoggedIn} exact path={'/'} component={JournalScreen} />
                    <Redirect to="/auth/login" />
                </Switch>    
            </div>            
        </Router>
    )
}
