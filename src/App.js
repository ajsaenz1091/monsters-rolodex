import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

// Component is part of the react library and we are using destructuring { Component } to access it. Another way to do this is by 
// not including it in the initial import React from 'react; and instead doing React.Component after the extends keyword in our class declaration.
// Component is a property of the react library that gives us some functionalities to use whithin our app.(render(), setState(),...)
class App extends Component {
  constructor() {
    super();
  
    this.state = {
      monsters : [],
      searchField: '',
    };

    // You need to bind your functions to the context to use them, but you can use arrow functions to skip this step.
    // this.handleChange = this.handleChange.bind(this);
  }

  //This is a lifecycle method
  componentDidMount() {

    fetch('https://jsonplaceholder.typicode.com/users') // fetch returns a promise
    .then(response => response.json()) // this returns a response that we need to return in a json format
    .then(users => this.setState({ monsters: users })); // this returns an array of objects with the user data in the api which we will use to set our state

  }

  handleChange= (input) => {
    this.setState({searchField: input.target.value})
  }
  
  render() {
    const {monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()))
    return (
      <div className="App">
      <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />

      </div>
    );
  }
}


export default App;
