import React, { useState } from 'react'
import { db } from '../../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import firebase from 'firebase/app'
import { Button } from '@material-ui/core'
import SelectList from '../../molecules/SelectList'

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

firebase.firestore().settings({
  ignoreUndefinedProperties: true
})

const Movie: React.FC = () => {
  const [posts, setPosts] = useState([
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

  const user = useSelector(selectUser)
  const [title, setTitle] = useState('')

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
      <div>
        {posts.map(post => (
          <SelectList
            key={post.id}
            postId={post.id}
            avatar={post.avatar}
            image={post.image}
            text={post.text}
            timestamp={post.timestamp}
            username={post.username}
            value={post.text}
            label={post.text}
          />
        ))}
      </div>

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
