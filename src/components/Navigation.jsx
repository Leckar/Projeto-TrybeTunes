// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/search" data-testid="link-to-search">Busca</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </nav>
    );
  }
}

export default Navigation;
