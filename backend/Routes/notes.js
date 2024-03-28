const express = require('express');
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
// const Note = require('../models/Notes')
const Note = require('../models/Notes')

// Route 1: Get all the Notes GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server occur");
    }
})

// Route 2: add a new note using POST "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // if there are errors,return bad request and the errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.send(`Hello, ${req.query.person}!`);
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savenote = await note.save()
            res.json(savenote)

        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal server occur");
        }

    })

// Route 3: updatenote using POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server occur");
    }
})

// router.delete('/deletenote/:id', fetchuser, async (req, res) => {
//     try {
//         let note = await Note.findById(req.params.id);
//         if (!note) {
//             return res.status(404).send("Not found")
//         }
//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not allowed");
//         }
//         note = await Note.findByIdAndDelete(req.params.id)
//         res.json({"sucess": "Note has been deleted"})
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("internal server occur");
//     }
// })

// Route 4: deletenote using Delete "/api/notes/deletenote". Login required
    router.delete('/deletenote/:id', fetchuser, async (req, res) =>{

   try {
     // Find the note to be deleted and delete it
     let note = await Note.findById(req.params.id);
     if(!note){
         return res.status(404).send("Not found")
     }

     // Allow deletion only if user owns this Note
     if(note.user.toString() !== req.user.id){
         return res.status(401).send("Not allowed");
     }
     note = await Note.findByIdAndDelete(req.params.id)
     res.json({"sucess": "Note has been deleted"});

   } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server occur");
   }
    })


module.exports = router