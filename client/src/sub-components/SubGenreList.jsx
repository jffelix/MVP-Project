import React from 'react';
import SubGenreListItem from './SubGenreListItem.jsx';

var SubGenreList = (props) => {

    if (props.subList === undefined) {

        return (
            <div>Loading...</div>
        )

    } else {

        return (
            <div>
                {props.subList.map((subGenre, index) => 
                
                    <SubGenreListItem item={subGenre} key={index} />

                )}
            </div>

        )
    }

}

export default SubGenreList;