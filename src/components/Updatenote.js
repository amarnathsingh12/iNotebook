import React, { useState,useContext, useEffect } from 'react';
import noteContext from '../Context/notes/notecontext';

const Updatenote = ({ note, onClose }) => {

    const context = useContext(noteContext);
    const { editNote } = context;
    const [notes, setNotes] = useState({ title: "", description: "", tag: "default" });

    useEffect(() => {
        setNotes({ title: note.title, description: note.description, tag: note.tag });
    }, [note]);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(notes)
        editNote(note._id, notes.title, notes.description, notes.tag)
        // Add your update logic here
        onClose(); // Close modal after updating
    };

    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='my-3' onSubmit={handleClick}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="title"
                                    value={notes.title} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="description"
                                    value={notes.description} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="tag"
                                    value={notes.tag} onChange={onChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Updatenote;
