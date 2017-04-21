import React from 'react';
import PropTypes from 'prop-types';

function Playlist(props) {
  return(<div className='playlist'>
            <button className={props.text} onClick={()=>{props.onClick(props.uri)}}>{props.text}</button>
            <iframe src={`https://open.spotify.com/embed?uri=${props.uri}`}
            width={props.width} 
            height={props.height}>
            </iframe>
            
        </div>);
}

Playlist.proptypes = {
  uri: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.string
}

export default Playlist;