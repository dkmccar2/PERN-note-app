import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("https://pern-note-app.vercel.app/getnotes")
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((data) => {
        setNotes(data);
        console.log("Notes loaded from database: " + data);
      });
  }, []);

  const handleAddItem = async (newNote) => {
    console.log("Adding note.. " + newNote);
    let id;

    try {
      await axios
        .post("https://pern-note-app.vercel.app/addnote", {
          title: newNote.title,
          content: newNote.content,
        })
        .then((res) => {
          console.log(res);
          console.log("New note added with id: " + res.data);
          id = res.data;
        });
    } catch (error) {
      console.error("Error adding item:", error);
    }

    if (id) {
      console.log(id);
      setNotes((prevNotes) => {
        return [
          ...prevNotes,
          { id: id, title: newNote.title, content: newNote.content },
        ];
      });
    } else {
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
    }
  };

  const handleDeleteItem = async (id) => {
    console.log("Deleting note with id: " + id);

    try {
      await axios
        .delete("https://pern-note-app.vercel.app/deletenote", {
          data: { deleteid: id },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    } catch (error) {}
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={handleAddItem} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={handleDeleteItem}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
