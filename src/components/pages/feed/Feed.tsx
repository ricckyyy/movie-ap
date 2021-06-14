import React, { useState, useEffect, Component } from 'react'
import { db } from '../../../firebase'
import TweetInput from '../../TweetInput'
import style from './Feed.module.css'
import Post from '../../templates/Post'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class Test extends Component {
  render () {
    return <h1>test</h1>
  }
}

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
      <Router>
        <Switch>
          <Route path='/About'>
            <Test></Test>
          </Route>
        </Switch>
        <Link to='/tesst'>aaaa</Link>
      </Router>

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
