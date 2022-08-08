import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { data, handleChange, favorites } = this.props;
    const checked = favorites
      .some(({ trackId }) => data.trackId === Number(trackId));
    return (
      <section>
        <div key={ data.trackName }>
          <div>
            <h4>
              { data.trackName }
            </h4>
          </div>
          <div>
            <audio
              data-testid="audio-component"
              src={ data.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <input
              type="checkbox"
              name={ data.trackId }
              checked={ checked === true ? checked : false }
              data-testid={ `checkbox-music-${data.trackId}` }
              onChange={ (event) => handleChange(event) }
            />
          </div>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.shape({
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackNumber: PropTypes.number,
    trackName: PropTypes.string,
  }),
  favorites: PropTypes.arrayOf(PropTypes.shape({ trackId: PropTypes.string })),
  handleChange: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  data: {},
  favorites: [],
};

export default MusicCard;
