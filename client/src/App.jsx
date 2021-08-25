import React from 'react';
import testSeeds from './seeds.js';
import GenreList from './sub-components/GenreList.jsx';
import SubGenreList from './sub-components/SubGenreList.jsx';
import axios from 'axios';

import "./App.css";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullGenreList: [],
            wasGenreSelected: false,
            selectedGenre: null,
            subGenreList: [],
            wasPlaySongClicked: false,
            selectedColor: null
        }

        this.getGenres = this.getGenres.bind(this);
        this.clickGenre = this.clickGenre.bind(this);
        this.showSubGenreList = this.showSubGenreList.bind(this);
        this.clickPlaySong = this.clickPlaySong.bind(this);
    }

    componentDidMount() {
        this.getGenres();
    }

    getGenres() {
        axios.get('/genres')
        .then((response) => {
            this.setState({
                fullGenreList: response.data
            }, () => {
                console.log('response.data: ', response.data);
            })
        })
        .catch((err) => {
            console.log('Error received from Axios GET request: ', err);
        })
    }

    clickGenre(event) {
        // console.log('clicked genre: ', event.target.value);
        var genreParsed = JSON.parse(event.target.value);
        
        this.setState({
            selectedGenre: genreParsed,
            wasGenreSelected: true,
        }, () => {

            this.showSubGenreList(genreParsed);
            // console.log('selectedColor: ', this.state.selectedColor);
        })

    }

    showSubGenreList(genre) {
        // console.log('genre from showSubGenreList: ', genre);

        var matchedGenre = null;

        for (var i = 0; i < this.state.fullGenreList.length; i++) {
            if (this.state.fullGenreList[i].genreName === genre) {
                matchedGenre = this.state.fullGenreList[i];
            }
            // console.log(this.state.fullGenreList[i]);
        }

        this.setState({
            subGenreList: matchedGenre

        }, () => {
            // console.log('genreColor: ', genreParsed.genreColor);
            console.log('subGenreList: ', this.state.subGenreList);

            this.setState({
                selectedColor: this.state.subGenreList.genreColor
            })
        })

    }

    clickPlaySong() {
        this.setState({
            wasPlaySongClicked: true
        })
    }

    render() {
        // console.log('testSeeds: ', testSeeds);

        // if using spotify, must create a conditional to render log in page

        if (!this.state.wasGenreSelected) {

            return (
                <div className="main">
                    <h1 className="title">EDM Crash Course!</h1>
                    <i className="subTitle">Does all electronic music really sound the same?</i>
                    <GenreList list={testSeeds} clickGenre={this.clickGenre} />
                </div>
            )

        } else {

            return (
                <div className={this.state.selectedColor} >
                    <h1 className="title">EDM Crash Course!</h1>
                    <i className="subTitle">Click around and explore!</i>
                    <GenreList list={this.state.fullGenreList} clickGenre={this.clickGenre} />
                    <p></p>

                    <SubGenreList 
                    subList={this.state.subGenreList.subGenres}
                    clickPlaySong={this.clickPlaySong}
                    wasPlaySongClicked={this.state.wasPlaySongClicked} />
                </div>
            )

        }


    }


}

export default App;