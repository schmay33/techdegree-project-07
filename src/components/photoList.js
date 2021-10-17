import React, { Component } from 'react';
import Photo from './photo';
import NotFound from './notFound';

export default class PhotoList extends Component {
    componentDidUpdate() {
        if (this.props.searchInput !== this.props.query) {
          this.props.onSearch(this.props.query);
        }
    }
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