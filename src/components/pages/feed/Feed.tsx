import React, { useState, useEffect, Component } from 'react'
import { db } from '../../../firebase'
import TweetInput from '../../templates/TweetInput'
import style from './Feed.module.css'
import Post from '../../templates/Post'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import MovieList from '../movie/MovieList'
import SelectList from '../../molecules/SelectList'

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: '',
      avatar: '',
      image: '',
      text: '',
      timestamp: null,
      username: ''
    }
  ])

  useEffect(() => {
    const unSub = db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username
          }))
        )
      )
    return () => {
      unSub()
    }
  }, [])

  return (
    <div className={style.feed}>
      <TweetInput />

      {posts[0]?.id && (
        <>
          {posts.map(post => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default Feed
