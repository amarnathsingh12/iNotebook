import React, {useContext} from 'react'
import Noteitem from './Noteitem';
import noteContext from '../Context/notes/notecontext';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes} = context;
    return (
        <>
        <AddNote/>
        <div className="row my-3">
            <h1>Note</h1>
            {notes.map((note)=>{
                return <Noteitem key = {note._id} note = {note}/>
            })}
        </div>
        </>
    )
}

export default Notes













// import React, { useContext } from 'react';
// import noteContext from '../Context/notes/notecontext';

// export const Notes = () => {
//     const context = useContext(noteContext);

//     // Assuming context structure includes a 'notes' property
//     const { notes, setnotes } = context;

//     // Ensure 'notes' is an array before mapping over it
//     if (!Array.isArray(notes) || notes.length === 0) {
//         return (
//             <div className="container my-3">
//                 <h1>Note</h1>
//                 <p>No notes available.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container my-3">
//             <h1>Note</h1>
//             {
//                 (notes && notes.length > 0)
//                     ?
//                     notes.map((note) => {
//                         return <Noteitem key={note._id} setnotes={setnotes} note={note} />
//                     })
//                     :
//                     null
//             }



//             {/* {notes.map((note) => (
//                 <div notes key={note._id}>{note.title}</div>
//             ))} */}
//         </div>
//     );
// };
