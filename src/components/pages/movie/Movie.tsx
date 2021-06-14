import React, { useState } from 'react'
import { db } from '../../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import firebase from 'firebase/app'
import { Button } from '@material-ui/core'

firebase.firestore().settings({
  ignoreUndefinedProperties: true
})

const Movie = () => {
  const user = useSelector(selectUser)
  const [title, setTitle] = useState('')

  // const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files![0]) {
  //     setTweetImage(e.target.files![0])
  //     e.target.value = ''
  //   }
  // }

  const sendTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    db.collection('movies').add({
      avatar: user.photoUrl,
      image: '',
      text: title,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      id: ''
    })
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={sendTitle}>
        <div>
          <input
            placeholder='映画タイトル'
            type='text'
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Button type='submit'>登録</Button>
        </div>
      </form>
    </div>
  )
}

export default Movie
