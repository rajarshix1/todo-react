import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  let [i, setI]=useState(1)
  const [keyy, setKeyy]= useState([null])
  const [notes, setNotes]= useState(()=>{
    const savedNotes = localStorage.getItem('notes')
  if (savedNotes){return(JSON.parse(savedNotes))}
  else{return([])}
  })
  let [show, setShow]=useState(null)
  let [index, setIndex ]= useState(()=>{
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes){
      if(notes.length!=0){return(notes[notes.length-1]['index']+1)}
      else{return(1)}
    }else{return(1)}
  })
  const [newNote, setNewNote]= useState('')
  const [editNote, setEditNote]= useState('')
  useEffect(()=>{
    localStorage.setItem('notes', JSON.stringify(notes))
  })

  const handleNewNote=(e)=>{
    setNewNote(e.target.value)
  }
  const handleEditNote=(e)=>{
    setEditNote(e.target.value)
    // console.log(editNote)
  }
  const addEditNote=(e)=>{
    e.preventDefault()
    // console.log(show);
    let nn= notes
    let idx=notes.findIndex((note=>note.id==show))
    nn[idx].desc=editNote
    setNotes(nn)
    setEditNote('')
    setShow(null)
  }
  const addNote=(e)=>{
    e.preventDefault()
    let noteObj={
      desc: newNote, id: notes.length+1, index: index
    }
    setNotes(notes.concat(noteObj))
    setNewNote('')
    setKeyy(keyy.concat(i))
    setI(i+=1)
    setIndex(index+=1)
  }
  const deleteNote=(id)=>{
    setNotes(notes.filter((note)=>note.index!=id))
  }
  
  useEffect(()=>   {
    console.log(index);
    console.log(notes);
    }
  
  )

  return (
    <div >
      <h1>Todo</h1>
      <ul>
        {notes.map((note,i)=>(<li key={keyy[i]}>{note.desc}<br/>
        <button onClick={()=>deleteNote(note.index)}>Delete</button>
        <button onClick={()=>setShow(note.id)}>Edit</button>
        <form onSubmit={addEditNote} style={show===note.id?{ display:'block'}: { display:'none'}}>
        <input value={editNote} onChange={handleEditNote}></input>
        <button type='submit'>Done</button>
        </form>
        </li>))}
      </ul>
      <form onSubmit={addNote}>
        <input type='text' value={newNote} onChange={handleNewNote} ></input>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}
export default App;
