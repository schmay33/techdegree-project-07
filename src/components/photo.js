import React from 'react';

// Create a photo list item inside the PhotoList
const Photo = ({ id, server, secret, title }) => {
  return(
    <li>
      <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />
    </li>
    )
};

export default Photo;