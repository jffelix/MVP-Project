import React from 'react';

// var GenreListItem = (props) => (
//     <div>
//         <p>{props.item.genreName}</p>
//     </div>
// )

class GenreListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        var genreStringify = JSON.stringify(this.props.item.genreName);

        return (

            <option value={genreStringify}>{this.props.item.genreName}</option>

        )
    }
}

export default GenreListItem;