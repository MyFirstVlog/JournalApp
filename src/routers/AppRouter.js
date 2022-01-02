import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { login } from '../actions/auth'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {
    //? Aquí se captura el estado del úlyimo logueado por parte de firebase
    const auth = getAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth,(user)=> {
            console.log({user});
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
            }
        })
    }, [])

    return (
        <Router>
            <div>
                <Switch>
                    <Route path={'/auth'} component={AuthRouter} />
                    <Route exact path={'/'} component={JournalScreen} />
                    <Redirect to="/auth/login" />
                </Switch>    
            </div>            
        </Router>
    )
}
