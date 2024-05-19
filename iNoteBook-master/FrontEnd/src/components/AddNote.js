import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/NoteContext";


const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote} = context

    const [note, setNote] = useState({title : "", description :"",tag :"Default"})
    const HandleClick =(e)=>{
        e.preventDefault()
        addNote(note.title, note.description,note.tag)
    }
    const HnadleChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value })
    }
  return (
    <div>
      {/* <h2>Welcome {localStorage.getItem('iNotebookName')} to iNoteBook</h2> */}

      <h3>Add a New Note</h3>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={HnadleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="description"
            onChange={HnadleChange}
          />
        </div>
        
        <button disabled={note.title.length<3 || note.description.length<=5} type="submit" className="btn btn-primary" onClick={HandleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
