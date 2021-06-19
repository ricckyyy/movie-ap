import React, { useState, useEffect, Component } from 'react'
import { db } from '../../../firebase'
import MovieInput from './MovieInput'
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom'
import User from '../user/User'
import Feed from '../feed/Feed'

interface PROPS {
  postId: string
  avatar: string
  image: string
  text: string
  timestamp: any
  username: string
}

const Movie: React.FC<PROPS> = props => {
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
      .collection('movies')
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
    <div>
      <MovieInput />
      {posts.map(post => (
        <div>
          <BrowserRouter>
            <div>
              <Link to='/feed/1'>{post.text}</Link>
              <Switch>
                <Route path='/feed/1' component={Feed}></Route>;
              </Switch>
            </div>
          </BrowserRouter>
          {/* <div>
            <h2>{post.text}</h2>
          </div> */}
          <span>{post.id}</span>
        </div>
      ))}
    </div>
  )
}

export default Movie
