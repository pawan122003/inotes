import noteContext from "./NoteContext";
import { useState } from "react";

// Create a state

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // GEt ALl Notes
  const getNote = async () => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    //logic to add note
    const json = await response.json();
    // console.log(json.notes);
    setNotes(json.notes)
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //logic to add note
    console.log("adding a new note ");
    const note=await response.json()
    console.log(note.saveNote)
    setNotes(notes.concat(note.saveNote));
  };



  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    //LOGIC FOR EDIT NOTE
    let newNote= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
    setNotes(newNote)
  };

  
  //Delete a Note
  const deleteNote =async (id) => {
    // API CALL 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      }
    });
    // Logic
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
