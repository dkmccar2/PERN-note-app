import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const testURL = "/getnotes";
    const myInit = {
      method: "GET",
      mode: "no-cors",
    };

    const myRequest = new Request(testURL, myInit);

    fetch(myRequest)
      .then((response) => {
        //  console.log(response);
        // console.log(response.data);
        return response.data;
      })
      .then(function (data) {
        console.log(data);
        setNotes(data);
      })
      .catch(function (e) {
        console.log(e);
      });
    // axios
    //   .get("https://pern-note-app.vercel.app/getnotes")
    //   .then((res) => {
    //     console.log(res);
    //     return res.data;
    //   })
    //   .then((data) => {
    //     setNotes(data);
    //     console.log("Notes loaded from database: " + data);
    //   });
  }, []);

  const handleAddItem = async (newNote) => {
    console.log("Adding note.. " + newNote);
    let id;

    try {
      // const testURL = "/addnote";
      // const myInit = {
      //   method: "POST",
      //   mode: "no-cors",
      // };

      // const myRequest = new Request(testURL, myInit);

      // fetch(myRequest)
      //   .then(function (response) {
      //     return response;
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (e) {
      //     console.log(e);
      //   });
      await axios
        .post("/addnote", {
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
      // const testURL = `deletenote/${id}`;
      // const myInit = {
      //   method: "DELETE",
      //   mode: "no-cors",
      // };

      // const myRequest = new Request(testURL, myInit);

      // fetch(myRequest)
      //   .then(function (response) {
      //     return response;
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (e) {
      //     console.log(e);
      //   });
      // await axios.delete(`/deletenote/$1`, [id]).then((res) => {
      //   console.log(res);
      //   console.log(res.data);
      // });
      await axios
        .delete("/deletenote", { data: { deleteid: id } })
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
  // function addNote(newNote) {
  //   // console.log(newNote);
  //   try {
  //     const response = async () => {
  //       await fetch("http://localhost:4000/addnote", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newNote),
  //       });
  //     };
  //     //console.log(response);
  //   } catch (error) {
  //     console.error("Error adding item:", error);
  //   }
  //   setNotes((prevNotes) => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  // function deleteNote(id) {
  //   setNotes((prevNotes) => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

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
