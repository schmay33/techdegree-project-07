import React , { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import axios from 'axios';

//css
import './App.css';

//import 3 default topics to the home page.
import { lakes, dogs, mountains } from './components/tag';

//App components.
import PhotoContainer from './components/photoContainer';
import SearchForm from './components/searchForm';
import Nav from './components/nav';
import PageNotFound from "./components/pageNotFound";

//Data fetching from config.
import apiKey from './config';

// Main App
class App extends Component {

  source = axios.CancelToken.source();

  state = {
    images: [],
    title: '',
    loading: true
  }

  componentDidMount() {
  // initial load of photos
    this.performSearch();
  }

  componentWillUnmount() {
    if (this.source) {
      this.source.cancel("Landing Component got unmounted");
    }
  }
  
  // Search Flickr and set the photos returned to state
  performSearch = (query = 'lakes') => {
    this.setState({ loading: true });
    axios.get('https://www.flickr.com/services/rest', {
       params: {
          method: 'flickr.photos.search',
          tags: query,
          api_key: apiKey,
          per_page: 24,
          format: 'json',
          nojsoncallback: 1,
          cancelToken: this.source.token
       }
    })
    .then(res => {
        let data = res.data.photos.photo;
        this.setState({
           images: data,
           title: query,
           loading: false
        })
    })
    .catch(err => {
      console.log('Error: ', err.message);
      this.setState({ isLoading: false });
    });
  }
  
  // Create the Browser Router to swtich between the different paths
  render () {
    return (
      <BrowserRouter>
        <h1>Welcome to my photo gallery!</h1>
        <div className="container">
        <SearchForm onSearch={this.performSearch} loading={this.loading} />
        <Nav onSearch={this.performSearch} loading={this.loading}/>
          {
              (this.state.loading)
                ? <p>loading...</p>
                : <Switch>
                    <Route exact path="/" render={() => <Redirect to="/Lakes" data={lakes}/>} />
                    <Route path="/Lakes" render={() => <PhotoContainer title="Lakes" data={lakes} />} />
                    <Route path="/Dogs" render={() => <PhotoContainer title="Dogs" data={dogs} />} />
                    <Route path="/Mountains" render={() => <PhotoContainer title="Mountains" data={mountains} />} />
                    <Route path="/search/:term" render={() => <PhotoContainer title={this.state.title} data={this.state.images} />} />
                    <Route path="*" component={PageNotFound} />
                  </Switch>
          }
        </div>
      </BrowserRouter> 
    )
  }
}


export default withRouter(App);