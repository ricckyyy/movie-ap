import React, { useState, useEffect, Component } from 'react'
import Select from 'react-select'
import { db, auth } from '../../../firebase'

interface PROPS {
  postId: string
  avatar: string
  image: string
  text: string
  timestamp: any
  username: string
  value: string
  label: string
}

const User: React.FC<PROPS> = props => {
  const [val, setVal] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setVal(e.target.value)
  }

  const [movieid, setMovieId] = useState('')
  const [movie, setMovie] = useState([
    {
      id: '111',
      avatar: '',
      image: '',
      text: '',
      timestamp: null,
      username: '',
      value: '',
      label: ''
    }
  ])
  useEffect(() => {
    db.collection('movies')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setMovie(
          snapshot.docs.map(doc => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
            value: doc.data().text,
            label: doc.data().text
          }))
        )
      )
    console.log(movie)
    return () => {}
  }, [])

  return (
    <div>
      {/* <Tag /> */}
      <Select options={movie}></Select>
      <h2>{val}</h2>
      {/* <h2>{posts}</h2> */}
      <div>
        <select
          name='pets'
          id='pet-select'
          onChange={e => setMovieId(e.target.value)}
        >
          {movie.map((value, key) => {
            return (
              <option key={key} value={value.id}>
                {value.text}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default User
