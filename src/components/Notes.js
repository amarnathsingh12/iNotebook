import React, { useContext, useEffect} from 'react'
import Noteitem from './Noteitem';
import noteContext from '../Context/notes/notecontext';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes} = context;
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login")
        }
         // eslint-disable-next-line
    }, [])
    return (
        <>
            <AddNote />
            <h1>Note</h1>
            <div className="row my-3">
                
                {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <Noteitem key={note._id} note={note} />
                ))
            ) : (
                <p>No notes available</p>
            )}
            </div>
        </>
    )
}

export default Notes
