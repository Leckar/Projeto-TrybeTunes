import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isButtonDisabled: true,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
  }

  handleChange({ value }) {
    const valid = 3;
    return value.length >= valid ? this.setState({
      user: value,
      isButtonDisabled: false,
    })
      : this.setState({
        user: value,
        isButtonDisabled: true,
      });
  }

  async handleSubmit() {
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser({ user });
    const { history } = this.props;
    history.push('/search');
  }

  conditionalRender() {
    const { user, isButtonDisabled, loading } = this.state;
    const form = (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            value={ user }
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ () => this.handleSubmit() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
    return loading ? <Loading /> : form;
  }

  render() {
    return (
      this.conditionalRender()
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
