import { type } from "@testing-library/user-event/dist/type";import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNote";
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

export const  startLoadingNotes =  (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNote(notes));
    }
}

export const setNote = (notes) =>( {
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        if ( !note.url ){
            delete note.url;
        }

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

        await updateDoc(noteRef, noteToFireStore);

        dispatch(refreshNote(note.id,noteToFireStore));
        Swal.fire('Saved', note.title, 'success');

    }
};

export const refreshNote = (id, note)=> (
    {
        type: types.notesUpdated,
        payload: {
            id, note:
            {
                id,
                ...note
            }
        }
    }
)
