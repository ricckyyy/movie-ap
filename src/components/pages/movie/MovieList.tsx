import React, { useState, useEffect, Component } from 'react'
import { db } from '../../../firebase'
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom'
import Feed from '../feed/Feed'

interface PROPS {
  postId: string
  movieid: string
  avatar: string
  image: string
  text: string
  timestamp: any
  username: string
}

const MovieList: React.FC<PROPS> = props => {
  const [titles, setTitles] = useState([
    {
      id: '',
      movieid: '',
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
        setTitles(
          snapshot.docs.map(doc => ({
            id: doc.id,
            movieid: doc.data().movieid,
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
      {titles.map(post => (
        <div>
          <BrowserRouter>
            <div>
              <Link to='/feed/1'>{post.text}</Link>
              <Switch>
                <Route path='/feed' component={Feed}></Route>
              </Switch>
            </div>
          </BrowserRouter>

          <span>{post.id}</span>
          <div>
            <h2>{post.movieid}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList
