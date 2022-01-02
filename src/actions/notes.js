import { type } from "@testing-library/user-event/dist/type";import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";

//* Actions:

//? Middleware asincrono
export const startNewNote = ()=> {
    return async (dispatch, getState)=>{
        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const doc = await addDoc(collection(db, `${uid}`, "/journal/notes"),{
            newNote
        });

        console.log("Doc wirtten with ID", doc)

        dispatch(activeNote(doc.id, newNote ));


    }
}

//? reducer
export const activeNote = (id , note) => ({
    type: types.notesActive,
    payload : {
        id,
        ...note
    }
})

export const setNote = (notes) =>( {
    type: types.notesLoad,
    payload: notes
})