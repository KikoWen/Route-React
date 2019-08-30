import React, {Component} from 'react';
import { Router, Link } from '@reach/router';
import {getTypes, getSingleUser} from './API';

import RouteProjects from './RouteProjects';
import RouteAddProject from './RouteAddProject';
import RouteEditProject from './RouteEditProject';
import './App.css';
import RouteSingleType from './RouteSingleType';
import RouteLogin from './RouteLogin';
import { navigate } from '@reach/router/lib/history';
import RouteNotFound from './RouteNotFound';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      types:[],
      currentUser: null
    }
  }

  setCurrentUser = (user) =>{
    this.setState({currentUser:user})
  }

  componentDidMount(){
    getTypes().then(res => this.setState({types:res.data}))

    //local storage

      var userId = localStorage.getItem('userId')
  
      if(userId){
      getSingleUser(userId).then (res => this.setState({currentUser:res.data}))
      }
  }

  handleLogoutClick = () => {
    localStorage.removeItem('userId')
    this.setState({currentUser:null})
    navigate('login')
  }


  render(){

    var {types, currentUser} = this.state
    return (
      <div className="app">


          <div className="header">

            {
              currentUser ? ( <span>Welcome {currentUser.name}</span>):null
            }
            <i className="fas fa-bars"></i>
            <ul className="menu">
              <Link to="/projects">All Projects</Link>

              {
                types.map(type => <Link to={"/types/" + type.id}>{type.name}</Link>)
              }

              {
                currentUser ? (
                  <>
                  <Link to="/projects/create">Add a project</Link>
                  <li><a onClick = {this.handleLogoutClick} href="#">Logout</a></li>
                  </>
                ): (
                  <>
                  <Link to="/login">Login</Link>
                  <li><a href="">Signup</a></li>
                  </>
                )
              }
 
            </ul>
          </div>

          <Router>
            <RouteProjects path="/projects" />
            <RouteSingleType path="/types/:id"/>
            {/* Security protection */}

            {/* {currentUser? 
              <>
              <RouteAddProject path="/projects/create" /> 
              <RouteEditProject path="/projects/:id/edit" />
              </>
            : null} */}

            {currentUser? <RouteAddProject path="/projects/create" /> : null}
            
            {currentUser?<RouteEditProject path="/projects/:id/edit" />: null}
            
            <RouteLogin setCurrentUser= {this.setCurrentUser} path="/login" />

            <RouteNotFound default/>
          </Router>
        
      </div>
    );
  }
}

export default App;
