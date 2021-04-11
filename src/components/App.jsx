import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';
import qs from 'qs';

function App() {

  const [notes, setNotes] = useState([]);

  function addNote(note) {
    const options = {
      method: "POST",
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(note),
      url: "http://localhost:3001"
    };
    axios(options)
      .then(response => {
        console.log(response);
      });
  }

  function deleteNote(id) {
    const options = {
      method: "DELETE",
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({'id': id}),
      url: "http://localhost:3001"
    };
    axios(options)
      .then(response => {
        console.log(response);
      });
  }

  useEffect(() => {
    axios.get("http://localhost:3001").then(response => {
      // console.log(response);
      setNotes(response.data);
    });
  }, [notes]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => <Note key={note._id} id={note._id} title={note.title} content={note.content} onDelete={deleteNote} /> )}
      <Footer />
    </div>
  );
}

export default App;
