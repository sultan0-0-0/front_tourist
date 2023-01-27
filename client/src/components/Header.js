import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header">
        <nav className="navigation">
          <Link to="/">
            <a href="blog.html" className="navbar-logo">
              <span>Путешественникам</span>
            </a>
          </Link>
          <div className="navbar-right">
            <Link to="/search">Search</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
