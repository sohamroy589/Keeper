import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';
import qs from 'qs';

function App() {

  const [notes, setNotes] = useState([]);
  const [modified, setModified] = useState(true);
 
  function addNote(note) {
    const options = {
      method: "POST",
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(note),
      url: "http://localhost:3001"
    };
    axios(options)
      .then(response => {
        console.log(response.statusText + ", " + response.data);
        setModified(true);
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
        console.log(response.statusText + ", " + response.data);
        setModified(true);
      });
  }

  useEffect(() => {
    console.log("useEffect is called");
    if (!modified){
      return;
    }
    axios.get("http://localhost:3001").then(response => {
      console.log('Sent the get request');
      setNotes(response.data);
      setModified(false);
    });
  }, [modified]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} isDisabled={modified} />
      {notes.map(note => <Note key={note._id} id={note._id} title={note.title} content={note.content} onDelete={deleteNote} /> )}
      <Footer />
    </div>
  );
}

export default App;
