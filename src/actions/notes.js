import { type } from "@testing-library/user-event/dist/type";import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNote";
import { types } from "../types/types";

//* Actions:

//? Middleware asincrono
export const startNewNote = ()=> {
    return async (dispatch, getState)=>{
        const uid = getState().auth.uid;

        const newNote = {
            title: null,
            body: null,
            date: new Date().getTime()
        }
        const doc = await addDoc(collection(db, `${uid}`, "/journal/notes"),{
            newNote
        });

        console.log("Doc wirtten with ID", doc)

        dispatch(activeNote(doc.id, newNote ));
        dispatch(addNewNote(doc.id, newNote ));


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

export const startUploading =(file)=>{
    return async (dispatch, getState) => {
        const {active: activeNote} = getState().notes;

        Swal.fire({
            title: 'Uploading',
            test: 'Please Wait',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        console.log(fileUrl);
        // console.log(file);
        // console.log(activeNote);

        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        
        console.log('state', getState)

        const uid = getState().auth.uid;



        const noteRef = doc(db, `${uid}/journal/notes/${id}`);

        await deleteDoc(noteRef);

        dispatch(deleteNote(id));
    }
}


export const deleteNote= (id) =>({
    type: types.notesDelete,
    payload: id
})

export const cleanNotes = () => ({
    type: types.notesLogoutCleaning
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})