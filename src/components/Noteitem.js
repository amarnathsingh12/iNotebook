import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/notecontext';
import Updatenote from './Updatenote';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note } = props;

    const [showModal, setShowModal] = useState(false);

    const handleUpdateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={handleUpdateClick}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
            </div>
            {showModal && <Updatenote note={note} onClose={handleCloseModal} />}
        </div>
    );
}

export default Noteitem;
