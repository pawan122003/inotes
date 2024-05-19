const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body , validationResult } = require('express-validator');


//Route 1 : Get all the notes
router.get('/fetchallnotes',fetchuser,async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json({notes})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }

  
})
 

//Route 2 : Add a new note using post
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }).optional(),
],async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const error  = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array()})
        }
        let note = new Notes ({
           title, description: description ||'hell i am in', tag, user: req.user.id
        })

        const saveNote =await note.save()
        res.json({saveNote})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error1 occured")
    }
})


// Router 3: Update an existing note 
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;
    //Create a new note object
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find the note to be updated

    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send('Not Found')}
    if(note.user.toString()!==req.user.id){return res.status(401).send('Not Allowed')}
    //Update the note with the new
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
    res.json({note})

})


//Router 4: Delete the Note

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;

    //Find the note to be deleted

    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send('Not Found')}
    if(note.user.toString()!==req.user.id){return res.status(401).send('Not Allowed')}
    //Update the note with the new
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note deleted successfully",note:note})

})

module.exports = router
