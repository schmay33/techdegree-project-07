import React, { Component } from 'react';
import Photo from './photo';
import NotFound from './notFound';

/**
 * UL containing photos
 */
class PhotoContainer extends Component {
    //
    render() {
        const results = this.props.data,
        hasResults = results.length > 0;
        let photos;
        if (hasResults) {
            photos = results.map( (photo, idx) => {
            return <Photo 
                        key={idx.toString()}
                        id={photo.id}
                        server={photo.server}
                        secret={photo.secret}
                        title={photo.title}
                        />
            }); 
        } else {
            // no results so set not found
            photos = <NotFound />
        }
        // return the photos
        return (
            <div className="photo-container">
            <h2>{hasResults ? "Results for " + this.props.title : ''}</h2>
            <ul>
                {photos}
            </ul>
            </div>
        )
    }
}

export default PhotoContainer;