import React, { useEffect, useState } from 'react'
import { useParams,useNavigate,Link } from 'react-router-dom'
// import notes from '../assets/data.js'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
  let { id }  = useParams();
  let navigate = useNavigate()
  let [note, setNote] = useState({})
  let [noteCheck, setNoteCheck] = useState({})
  useEffect(() => {
    let getNote = async () => {
      if (id === 'new') return
      let response = await fetch(`/api/notes/${id}`)
      let data = await response.json()
      console.log(data)
      setNote(data)
    }
    getNote()
  }, [id])

  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: 'DELETE'
    })
    navigate('/')
  }

  let handleSubmit = () => {
    if (id !== 'new' && !note.body) {
      deleteNote()
    } else if (id !== 'new') {
      updateNote()
    } else if (id ==='new' && note !== null) {
      createNote()
    }
    navigate('/')
  }

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
          <Link to='/'>
            <ArrowLeft className='arrowImg' onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote} className='button'>Delete</button>
        ):(
          <button onClick={handleSubmit}>Save</button>
        )}
      </div>
      <div className="note-body">
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}> 

      
      <div>
        <input type="checkbox" style={{margin:'10px', height:'20px' , width:'20px' , color:'red'}} onChange={(e) => {setNoteCheck({...note, 'checkedHigh': e.target.checked,'checkedMedium':false,'checkedLow':false})}} checked={noteCheck.checkedHigh} />
        <label htmlFor="checkbox">High</label>
      </div>
      <div>
        <input type="checkbox" style={{margin:'10px', height:'20px' , width:'20px'}} onChange={(e) => {setNoteCheck({...note, 'checkedMedium': e.target.checked ,'checkedLow':false , 'checkedHigh':false})}} checked={noteCheck.checkedMedium} />
        <label htmlFor="checkbox">Medium</label>
      </div>
      <div>
        <input type="checkbox" style={{margin:'10px', height:'20px' , width:'20px'}} onChange={(e) => {setNoteCheck({...note, 'checkedLow': e.target.checked , 'checkedHigh':false ,  'checkedMedium':false })}} checked={noteCheck.checkedLow} />
        <label htmlFor="checkbox">Low</label>
      </div>
      </div>
        <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note.body}> 
        </textarea>
      </div>
      
    </div>
  )
}

export default NotePage