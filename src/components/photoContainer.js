import React, { Component } from 'react';
import Photo from './photo';
import NotFound from './notFound';

/**
 * PhotoContainer class to render the photo gallery container. Needs JSON data from Flickr.
 * Creates Photo objects for each result.
 */
export default class PhotoContainer extends Component {
    // If the search is different from current query then run search
    componentDidUpdate() {
        if (this.props.searchInput !== this.props.query) {
          this.props.onSearch(this.props.query);
        }
    }
    // Render the photo gallery on the page
    render() {
        const results = this.props.data;
        let photos = results.map((photo) => {
            return <Photo id={photo.id}
                            server={photo.server}
                            secret={photo.secret}
                            title={photo.title}  
                            key={photo.id}
                            />
        }); 
        // If no results then so not found page
        if (results.length > 0){
            return(
                <div className="photo-container">
                    <h2>Results for {this.props.title}</h2>
                    <ul>
                        {photos}
                    </ul>
                </div> 
            )
        } else {
            return <NotFound />
        }   
    }
}