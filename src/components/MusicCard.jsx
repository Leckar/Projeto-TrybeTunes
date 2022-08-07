import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { data } = this.props;
    return (
      <section>
        <div key={ data.trackName }>
          <div>
            <h4>
              { data.trackName }
            </h4>
            <p>
              { data.artistName }
            </p>
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
            <input type="checkbox" name={ data.trackId } />
          </div>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string,
    trackNumber: PropTypes.number,
    trackName: PropTypes.string,
  }),
};

MusicCard.defaultProps = {
  data: {},
};

export default MusicCard;
