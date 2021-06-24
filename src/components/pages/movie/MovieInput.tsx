import React, { useState } from 'react'
import { db } from '../../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import firebase from 'firebase/app'
import { Button } from '@material-ui/core'

firebase.firestore().settings({
  ignoreUndefinedProperties: true
})

const Movie: React.FC = () => {
  const user = useSelector(selectUser)
  const [title, setTitle] = useState('')

  const sendTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const S = '0123456789'
    const N = 8
    const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map(n => S[n % S.length])
      .join('')

    db.collection('movies').add({
      avatar: user.photoUrl,
      image: '',
      text: title,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      movieid: randomChar
    })
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={sendTitle}>
        <div>
          <form>
            <input
              placeholder='映画タイトル'
              type='text'
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
          <Button type='submit'>登録</Button>
        </div>
      </form>
    </div>
  )
}

export default Movie
