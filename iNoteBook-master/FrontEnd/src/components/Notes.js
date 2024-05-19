import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, getNote, editNote} = context
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNote()
      }else{
        window.location.href = "/login"
      }
         // eslint-disable-next-line
    },[])

    const [note, setNote] = useState({id:"",etitle : "", edescription :"",etag :"Default"})
    const updateNote =(currentNote)=>{
      ref.current.click()
      setNote({id:currentNote._id, etitle: currentNote.title , edescription : currentNote.description})
    }
    
    const HandleClick =(e)=>{
      e.preventDefault()
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click()
    }
    const HnadleChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value })
    }

    const ref = useRef(null)
    const refClose = useRef(null)
  
  return (
    <div>
      <AddNote/>
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">
                title
              </label>
              <input
                type="text"
                value={note.etitle}
                className="form-control"
                id="etitle"
                name="etitle"
                aria-describedby="emailHelp"
                onChange={HnadleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                value={note.edescription}
                name="edescription"
                className="form-control"
                id="edescription"
                onChange={HnadleChange}
              />
            </div>
            
          </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3||note.edescription.length<=5} type="button" className="btn btn-primary" onClick={HandleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length===0 && "No Notes to Display"}
        </div>
        {notes.map((note)=>{
            return <NoteItem updateNote={updateNote} note = {note}/>
        })}
      </div>
    </div>
  )
}

export default Notes
