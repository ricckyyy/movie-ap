import React, { useEffect } from 'react'
import style from './App.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import { auth } from './firebase'
import Feed from './components/pages/feed/Feed'
import Auth from './components/Auth'
import Home from './components/pages/home/Home'
// import Auth from './components/Auth'
// import Feed from './components/Feed'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App: React.FC = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName
          })
        )
      } else {
        dispatch(logout())
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <>
      {user.uid ? (
        <div className={style.app}>
          <Home />
        </div>
      ) : (
        <Auth />
      )}
    </>
  )
}

export default App
