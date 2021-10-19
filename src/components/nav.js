import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
   <nav className="main-nav">
      <ul>
         <li><NavLink to='/Lakes'>Lakes</NavLink></li>
         <li><NavLink to='/Dogs'>Dogs</NavLink></li>
         <li><NavLink to='/Mountains'>Mountains</NavLink></li>
      </ul>
   </nav>
);

export default Nav;
  