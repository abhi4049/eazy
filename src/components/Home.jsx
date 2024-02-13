import React, { useState, useEffect } from "react";import "./notestyle.css";
import Note from "./Note";

const Home = () => {
  const currentDate = new Date();
  const [notes, setNotes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const changeTheme = () => {
    document.body.classList.toggle("dark-theme");
  }
 
  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const addNote = () => {
    setIsAddModalOpen(true);
  }

  const saveNote = () => {
    const newNote = {
      title: document.querySelector(".inputtitle").value,
      content: document.querySelector(".inputnote").value,
      date: currentDate.toLocaleDateString("en-GB"),
      time: currentDate.toLocaleTimeString("en-GB")
    }

    if (newNote.title && newNote.content) {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      // Save notes to local storage
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      closeModal();
    } else if (newNote.title) {
      alert('Please fill in the contents of your note');
    } else if (newNote.content) {
      alert('Please give a concise title to your note');
    } else {
      alert('Please fill in the title and content of your note');
    }
  }

  const updateNote = (date, time, updatedNote) => {
    const updatedNotes = notes.map(note =>
      (note.date !== date || note.time !== time) ? note : { ...note, ...updatedNote }
    );
    setNotes(updatedNotes);
    // Save updated notes to local storage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (date, time) => {
    const retainedNotes = notes.filter(note => note.date !== date || note.time !== time);
    setNotes(retainedNotes);
    // Save remaining notes to local storage
    localStorage.setItem("notes", JSON.stringify(retainedNotes));
  };

  function closeModal() {
    setIsAddModalOpen(false);
  }

  return (
    <section className="note">
      <div className="navbar">
        <div className="title">eazynotes</div>
      <div>
      <button className="addnotes" onClick={addNote}>+</button>
        <div className="theme" onClick={changeTheme}>💡</div>
      </div>
      </div>
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 id="modaltitle">Add new note</h3>
            <textarea id="titleborder" className="inputtitle" type="text" autoFocus required placeholder="Enter title" maxLength="20"/>
            <textarea id="contentborder" className="inputnote" type="text" required placeholder="Enter note" maxLength="100" />
            <div id="modaloption">
              <button className="save" onClick={saveNote}>Save</button>
              <button className="close" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="notes-container">
        {notes.map(note => (
          <Note
            key={`${note.date}-${note.time}`}
            title={note.title}
            content={note.content}
            date={note.date}
            time={note.time}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;