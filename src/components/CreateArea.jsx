import React, {useState} from "react";

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setNote(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }
 
  return (
    <div>
      <form className="create-note" onSubmit={(event) => {
        props.onAdd(note);
        setNote({
          title: "",
          content: ""
        });
        event.preventDefault();
      }}>
        <input name="title" placeholder="Title" onChange={handleChange} value={note.title}/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={handleChange} value={note.content}/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
