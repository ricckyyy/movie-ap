import React, { useState, useEffect, Component } from 'react'
import { db } from '../../../firebase'
import MovieInput from './MovieInput'
import MovieList from './MovieList'
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom'
import User from '../user/User'
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
const Movie: React.FC<PROPS> = props => {
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
      <MovieInput />
      {titles.map(post => (
        <MovieList
          key={post.id}
          movieid={post.movieid}
          postId={post.id}
          avatar={post.avatar}
          image={post.image}
          text={post.text}
          timestamp={post.timestamp}
          username={post.username}
        />
      ))}
    </div>
  )
}

export default Movie
