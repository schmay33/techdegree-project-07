import axios from 'axios';
import apiKey from '../config';

// default categories
const defaultCategories = ['lakes', 'dogs', 'mountains'];

// initialize default variables
let lakes = {}, dogs = {}, mountains = {};

let source = axios.CancelToken.source();

// Run API search for default tags
const search = query => {
   axios.get('https://www.flickr.com/services/rest', {
      params: {
         method: 'flickr.photos.search',
         tags: query,
         api_key: apiKey,
         per_page: 24,
         format: 'json',
         nojsoncallback: 1,
         cancelToken: source.token
      }
   })
   .then(res => {
      const data = res.data.photos.photo;
      query === 'lakes' 
         ? lakes = data 
         : query === 'dogs' 
         ? dogs = data 
         : mountains = data;
   })
   .catch(err => console.log('There was an error fetching and retrieving data', err));
}

//run the default search for each tag
defaultCategories.forEach( category => search(category));

export { lakes, dogs, mountains };