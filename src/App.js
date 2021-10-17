import React , { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

//css
import './App.css';

//import 3 default topics to the home page.
import { lakes, dogs, mountains } from './components/tag';

//App components.
import PhotoList from './components/photoList';
import SearchForm from './components/search';
import Nav from './components/nav';
import PageNotFound from "./components/pageNotFound";
import NotFound from './components/notFound';

//Data fetching from config.
import apiKey from './config';

class App extends Component {
    state = {
      photos:[],
      loading: true,
      title:[],
      searchString:''
    };
    

    componentDidMount(){
      this.performSearch();
    }
  
    performSearch = (query = 'cats') =>{
      console.log('Performing Search...');
      this.setState({ loading: true });
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          if(response.data.photos.photo.length > 0 ){
            this.setState({
              photos: response.data.photos.photo,
              title: query,
              searchString: query,
              loading: false
            })
            console.log(this.loading);
        } else{
          this.setState({
            loading: false,
            searchString: "noresults"
          });
          this.props.history.replace("/noresults");
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({loading: false});
        // this.props.history.replace("/404");
      });
    }
    
    render () {
      
      return (
        <BrowserRouter>
            <div className="container">
              <SearchForm onSearch={this.performSearch} />
              <Nav />
              {
                 (this.state.loading)
                   ? <p>loading...</p>
                   : <Switch>
                        <Route exact path="/" render={ () => <PhotoList data={this.state.photos} title={this.state.title} />} />
                        <Route path="/lakes" render={ () => 
                          <PhotoList data={lakes} title={"lakes"} /> } />
                        <Route path="/dogs" render={ () => 
                          <PhotoList data={dogs} title={"dogs"} /> } />
                        <Route path="/mountains" render={ () => 
                          <PhotoList data={mountains} title={"mountains"} /> } />
                        <Route exact path="/:text" render={ () => 
                          <PhotoList data={this.state.photos} title={this.state.title} /> } />
                        <Route exact path="/noresults" component={NotFound} /> 
                        <Route exact path="/404" component={PageNotFound} /> 
                        <Route component={PageNotFound} /> 
                    </Switch>
              }
            </div>
        </BrowserRouter> 
      )
    }
}


export default App;