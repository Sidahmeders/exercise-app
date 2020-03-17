import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import '../styles/navBar.css';


class NavBar extends Component{

  render() {
    return (
    <div className="container">
       <nav>
        <Link to="/" className="item-head">Exercise/<span>Track</span>er</Link>
        <div>
        <ul className="list-items">
          <li>
          <Link to="/" className="item">WorkOuts</Link>
          </li>
          <li>
          <Link to="/create" className="item">Custom workout</Link>
          </li>
          <li>
          <Link to="/user" className="item">Create Exercise</Link>
          </li>
        </ul>
        </div>
      </nav>
    </div>
    
    );
  }
}


export default NavBar;
