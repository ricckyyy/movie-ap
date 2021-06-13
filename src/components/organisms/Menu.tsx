import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Feed from '../pages/feed/Feed'
import Movie from '../pages/movie/Movie'
const Menu = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/'>
            <Movie />
          </Route>
          <Route path='/about'>
            <Feed />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

const Users = () => {
  return <h2>Users</h2>
}

export default Menu
