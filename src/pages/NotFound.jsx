// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        404: PAGE NOT FOUND
      </div>
    );
  }
}

export default NotFound;
