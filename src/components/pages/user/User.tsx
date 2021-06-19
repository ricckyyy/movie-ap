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
            username: doc.data().username,
            value: doc.data().text,
            label: doc.data().text
          }))
        )
      )
    return () => {
      unSub()
    }
  }, [])

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  return (
    <div>
      {/* <Tag /> */}
      <Select options={posts} />
    </div>
  )
}

export default User
