import React from "react";
import noteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "659d8782b53839fd5e3599a8",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:50:58.421Z",
            "__v": 0
        },
        {
            "_id": "659d881b53839fd5e3599ac",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:53:31.508Z",
            "__v": 0
        },
        {
            "_id": "659d8782b3839fd5e3599a8",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:50:58.421Z",
            "__v": 0
        },
        {
            "_id": "659d881bb5339fd5e3599ac",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:53:31.508Z",
            "__v": 0
        }, {
            "_id": "659d8782b53839d5e3599a8",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:50:58.421Z",
            "__v": 0
        },
        {
            "_id": "659d881bb5839fd5e3599ac",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:53:31.508Z",
            "__v": 0
        }, {
            "_id": "659d8782b53839fd5e599a8",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:50:58.421Z",
            "__v": 0
        },
        {
            "_id": "659d881bb53839fd5e359ac",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-01-09T17:53:31.508Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    // add a note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "659d881bb5fd5e3ac",
            "user": "659b0e064d93d2e6df44f6fe",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-01-09T17:53:31.508Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // delete a node
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => {return note._id!==id})
        setNotes(newNotes)

    }
    // edit a note = 

    const editNote = (id, title, description, tag) => {
        // API call 
        
        for(let index = 0; index < notes.length; index++){
            const element = notes[index];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;