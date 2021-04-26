import React, {useState} from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isActive, setActive] = useState(false);

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
        if (note.title) {
          props.onAdd(note);
        }
        setNote({
          title: "",
          content: ""
        });
        event.preventDefault();
        setActive(false);
      }}>
        {isActive && <input name="title" placeholder="Title" onChange={handleChange} value={note.title} disabled={props.isDisabled}/>}
        <textarea name="content" placeholder="Take a note..." rows={isActive ? 3 : 1} onChange={handleChange} value={note.content} disabled={props.isDisabled} onClick={() => setActive(true)} />
        <Zoom in={isActive}>
          <Fab type="submit"><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
