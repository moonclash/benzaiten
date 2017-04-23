import React, { Component } from 'react';
import Playlist from './Playlist';
import '../App.css';

class Music extends Component {

  constructor() {
    super();
    this.updateSearch = this.updateSearch.bind(this);
    this.favouritesManager = this.favouritesManager.bind(this);
    this.showFavourites = this.showFavourites.bind(this);
    this.state = {
      userSearch: 'eminem',
      userResults: [],
      userFavourites: [],
      favouritesToggled: false
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
    this.setState({userFavourites: JSON.parse(localStorage.getItem('favourites')) || []});
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

    localStorage.setItem('favourites',JSON.stringify(userFavourites));
  }

  showFavourites() {
    let { favouritesToggled } = this.state;
    favouritesToggled = !favouritesToggled;
    this.setState({favouritesToggled});
  }

  render() {
    const { userResults, userFavourites, favouritesToggled } = this.state;
    return (<div className='music-wrap'>
             <nav>
                <input type="text" onChange={this.updateSearch}/>
                <button disabled={userFavourites.length <= 0} onClick={this.showFavourites}>favourites</button>
             </nav>
              <div className="music-container">
             {userResults.map((playlist,i) => {
             return <Playlist 
             uri={playlist.uri} 
             height={500} 
             text={userFavourites.indexOf(playlist.uri) > -1? 'remove' : 'add'}
             key={i} 
             onClick={this.favouritesManager}/>
             })}
             </div>
             <div className={`favourites ${favouritesToggled? 'toggled' : ''}`}>
             <button onClick={this.showFavourites}>close</button>
               {userFavourites.map((favourite, i) => {
                return <Playlist 
                uri={favourite} 
                key={i} 
                height={500}
                text={userFavourites.indexOf(favourite) > -1? 'remove' : 'add'}
                onClick={this.favouritesManager}
                />
               })}
             </div>
          </div>);
  }
}

export default Music;