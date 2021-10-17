import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () =>(
    <nav className="main-nav">
        <ul>
          <li><NavLink to="/lakes">Lakes</NavLink></li>
          <li><NavLink to="/dogs">Dogs</NavLink></li>
          <li><NavLink to="/mountains">Mountains</NavLink></li>
        </ul>
    </nav>
)

export default Nav;
  