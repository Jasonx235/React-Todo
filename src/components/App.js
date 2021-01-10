import React from 'react';

import Todos from './Todos';
import Header from './layout/header';
import AddTodo from './AddTodo';
import About from './pages/About';

//import {v4 as uuid} from 'uuid';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios';

import '.././App.css';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: []
    }
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data}))
  }

  //Toggle todo completed
  markComplete = (id) =>{
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  } 

  //Delete Todo Item
  delTodo = (id) =>{

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
    //this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]})
  }

  //Adding Todo Item
  AddTodo = (title)=>{
    // const newTodo = {
    //   id: uuid(),
    //   title: title, 
    //   completed: false
    // }

    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title, 
      completed: false
    })
    .then(res => this.setState({todos: [...this.state.todos, res.data]}))
    //this.setState({todos: [...this.state.todos, newTodo]});
  }


  render(){
  return (
    <Router>
    <div className="App">
      <div className="container">
        <Header/>
        <Route exact path="/" render={props => (
          <React.Fragment>
              <AddTodo AddTodo={this.AddTodo}/>
              <Todos 
              todos={this.state.todos}
              markComplete = {this.markComplete}
              delTodo = {this.delTodo}
              />
          </React.Fragment>
        )} />

        <Route path="/about" component={About}>

        </Route>
      </div>
    </div>
    </Router>
  );
  }
}

export default App;
