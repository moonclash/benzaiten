import React, { Component } from 'react';
import Playlist from './Playlist';
import '../App.css';

class Music extends Component {

  render() {
    return (<div className='music-container'>
             <Playlist uri='spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf' 
             width={300}
             height={600}
             text='foo'
             />
    </div>)
  }
}

export default Music;