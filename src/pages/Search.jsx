// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      isButtonDisabled: true,
      artistAlbums: [],
      listReady: false,
      lastQuery: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAlbumList = this.renderAlbumList.bind(this);
  }

  handleChange({ value }) {
    const valid = 2;
    return value.length >= valid ? this.setState({
      artist: value,
      isButtonDisabled: false,
    })
      : this.setState({
        artist: value,
        isButtonDisabled: true,
      });
  }

  async handleSubmit() {
    const { artist } = this.state;
    this.setState({ loading: true, listReady: false, lastQuery: artist });
    const artistData = await searchAlbumsAPI(artist);
    this.setState({
      loading: false,
      artist: '',
      artistAlbums: [...artistData],
      listReady: true,
    });
  }

  renderAlbumList() {
    const { artistAlbums, lastQuery } = this.state;
    if (artistAlbums.length > 0) {
      const arr = artistAlbums.map((e) => (
        <Link
          to={ `/album/${e.collectionId}` }
          key={ e.collectionId }
          data-testid={ `link-to-album-${e.collectionId}` }
        >
          <img
            src={ `${e.artworkUrl100}` }
            alt={ `capa do álbum ${e.collectionName}` }
          />
          <h4>
            { `${e.collectionName}` }
          </h4>
          <p>
            <i>
              { `${e.artistName}` }
            </i>
          </p>
        </Link>
      ));
      return (
        <div>
          <h3>
            Resultado de álbuns de:
            {' '}
            { lastQuery }
          </h3>
          { arr }
        </div>
      );
    }
    const arr = [
      <h4 key="notFound">
        Nenhum álbum foi encontrado
      </h4>,
    ];
    return arr;
  }

  render() {
    const { artist, isButtonDisabled, loading, listReady } = this.state;
    const form = (
      <form>
        <input
          type="text"
          value={ artist }
          data-testid="search-artist-input"
          onChange={ ({ target }) => this.handleChange(target) }
        />
        <button
          type="button"
          disabled={ isButtonDisabled }
          data-testid="search-artist-button"
          onClick={ () => this.handleSubmit() }
        >
          Pesquisar
        </button>
      </form>
    );
    return (
      <div data-testid="page-search">
        <Header />
        <main>
          { loading ? <Loading /> : form }
          { listReady ? this.renderAlbumList() : null }
        </main>
      </div>
    );
  }
}

export default Search;
