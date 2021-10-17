import React from 'react';
import { NavLink } from 'react-router-dom';

// Creates the Nav header buttons
const Nav = () =>(
    <nav className="main-nav">
        <ul>
          <li><NavLink to="/lakes">Lakes</NavLink></li>
          <li><NavLink to="/dogs">Dogs</NavLink></li>
          <li><NavLink to="/mountains">Mountains</NavLink></li>
          <li><NavLink to="/search">Search</NavLink></li>
        </ul>
    </nav>
)

export default Nav;
  