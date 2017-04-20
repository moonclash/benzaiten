import React, { Component } from 'react';
import Playlist from './Playlist';
import '../App.css';

class Music extends Component {

  constructor() {
    super();
    this.updateSearch = this.updateSearch.bind(this);
    this.favouritesManager = this.favouritesManager.bind(this);
    this.state = {
      userSearch: 'eminem',
      userResults: [],
      userFavourites: []
    }
  }

  updateQuery() {
    let { userSearch } = this.state;
    userSearch = userSearch.replace(/\s/gi,'%20').toLowerCase();
    fetch(`https://api.spotify.com/v1/search?q=${userSearch}&type=playlist`)
    .then(blob => blob.json().then(data => {
     
      const [...resultList] = [...data['playlists'].items];
      this.setState({userResults: resultList});
    }));
  }

  componentDidMount() {
    this.updateQuery();
  }

  componentDidUpdate() {
    this.updateQuery();
  }

  updateSearch(e) {
    const userSearch = e.target.value;
    this.setState({userSearch});  
  }

  favouritesManager(uri) {
    const {userFavourites} = this.state;
    if(userFavourites.indexOf(uri) === -1 ) {
      userFavourites.push(uri);
      this.setState({ userFavourites });
    }else {
      userFavourites.splice(userFavourites.indexOf(uri),1);
      this.setState({ userFavourites });
    }
  }

  render() {
    const { userResults } = this.state;
    return (<div className='music-wrap'>
             <nav>
                <input type="text" onChange={this.updateSearch}/>
                <button onClick={this.showFavourites}>favourites</button>
             </nav>
              <div className="music-container">
             {userResults.map((playlist,i) => {
             return <Playlist 
             uri={playlist.uri} 
             height={500} 
             width={300} 
             text='submit'
             key={i} 
             onClick={this.favouritesManager}/>
             })}
             </div>
          </div>);
  }
}

export default Music;