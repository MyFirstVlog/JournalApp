import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase-config"


export const loadNotes = async (uid) => {

    const notesSnap = await getDocs(collection(db, `${uid}`, "/journal/notes"));

    const notes = [];

    notesSnap.forEach(snap => {
        console.log(snap.data()); //acceso indv a los docs
        notes.push({
            id: snap.id,
            ...snap.data()
        })
    })

    console.log(notes);

    return notes
}