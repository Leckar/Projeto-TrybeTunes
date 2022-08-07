import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      snapshot: {},
      albumData: [],
    };
    this.getAlbumData = this.getAlbumData.bind(this);
  }

  async componentDidMount() {
    await this.getAlbumData();
  }

  async getAlbumData() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getMusics(id);
    const snapData = data.shift();
    this.setState({
      loading: false,
      snapshot: { ...snapData },
      albumData: [...data.filter((e) => e.trackId)],
    });
  }

  render() {
    const { loading, albumData, snapshot } = this.state;
    const { artistName, collectionName,
      artworkUrl100 } = snapshot;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <section>
              <img
                src={ artworkUrl100 }
                alt={ `Arte do álbum ${collectionName} do artista ${artistName}` }
              />
              <h3 data-testid="album-name">
                { collectionName }
              </h3>
              <h4 data-testid="artist-name">
                { artistName }
              </h4>
            </section>
            { albumData.map((track) => (
              <MusicCard
                key={ track.trackId }
                data={ track }
              />)) }
          </div>) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
