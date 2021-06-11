import React from 'react'
import { auth } from '../firebase'
import TweetInput from './TweetInput'
import style from './Feed.module.css'

const Feed = () => {
  return (
    <div className={style.feed}>
      Feed
      <TweetInput />
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  )
}

export default Feed
