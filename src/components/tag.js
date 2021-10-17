import axios from "axios";
import apiKey from "../config";

let lakes = {};
let dogs= {};
let mountains= {};

//Create Default Tag information
const Tag = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
        if(query === 'lakes'){
            lakes = res.data.photos.photo
        } 
        if(query === 'dogs'){
            dogs = res.data.photos.photo
        } 
        if(query === 'mountains'){
            mountains = res.data.photos.photo
        }
    })
 }

 // Create default tags for main page
Tag('lakes');
Tag('dogs');
Tag('mountains');

export {lakes, dogs, mountains};