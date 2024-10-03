import React from "react";
import noteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
        console.log(json)
        // if (Array.isArray(json)) {
        //     setNotes(json); // Ensure that the response is an array
        // } else {
        //     console.error("API did not return an array: ", json);
        //     setNotes([]); // Fallback to an empty array if the response is not an array
        // }
    }

    // add a note
    const addNote = async(title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)     
        if (Array.isArray(notes)) {
            const note = {
                "_id": json._id,  // Assuming this comes from the response
                "user": json.user,
                "title": title,
                "description": description,
                "tag": tag,
                "date": json.date || new Date().toISOString(),
                "__v": 0
            };
    
            setNotes([...notes, note]);  // Spread operator to append the new note
        } else {
            console.error("notes is not an array");
            setNotes([]);  // Reset notes to an empty array as a fallback
        }
    }

    // delete a node
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }
    // edit a note = 

    const editNote = async (id, title, description, tag) => {
        // API call 
        console.log(id)
        console.log(title)
        console.log(tag)
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, setNotes, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
};

export default NoteState;