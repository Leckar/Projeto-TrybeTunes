// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Navigation from './Navigation';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      userName: user.name,
      loading: false,
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>
          Trybetunes
        </h1>
        { loading ? <Loading /> : (
          <p data-testid="header-user-name">
            { userName }
          </p>
        )}
        {/* Ideia de criar um componente dedicado ao nav dada pelo colega Rafael Aguiar */}
        <Navigation />
      </header>
    );
  }
}

export default Header;
