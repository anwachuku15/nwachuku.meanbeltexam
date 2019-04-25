import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'react-router';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import PetForm from './components/PetForm';
import Details from './components/Details';
import EditForm from './components/EditForm';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Pet Shelter</h1>
        
        <BrowserRouter>
          <p><Link to='/'>Home</Link></p>
  
          <Route exact path='/' component={Homepage} />
          <Route exact path='/pets/new' component={PetForm} />
          <Route exact path='/pets/:_id/details' component={Details} />
          <Route exact path='/pets/:_id/edit' component={EditForm} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
