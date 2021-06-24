import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SelectList from '../molecules/SelectList'
import Feed from '../pages/feed/Feed'
import Home from '../pages/home/Home'
import Movie from '../pages/movie/Movie'
import User from '../pages/user/User'

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
              <Link to='/movie'>Movie</Link>
            </li>
            <li>
              <Link to='/feed'>Feed</Link>
            </li>
            <li>
              <Link to='/user'>Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/movie' component={Movie} />
          <Route path='/feed' component={Feed} />
          <Route path='/user' component={User} />
          {/* <Route path='/users'>
            <Users />
          </Route> */}
          <Route path='/memu' component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default Menu
