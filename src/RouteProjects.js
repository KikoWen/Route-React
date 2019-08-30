import React, {Component} from 'react';
import Project from './Project';
import {getProjects} from './API';

class RouteProjects extends Component {

  constructor(props){
    super(props)
    this.state = {
      projects:[
        // {
        //   id:1,
        //   name:'Build a hut',
        //   description: 'Nice project'
        // },{
        //   id:2,
        //   name:'Make a basket',
        //   description: 'Pretty project'
        // }
      ]
    }
  }

  rounteGetProjects = () =>{
    getProjects().then(res => {
      this.setState({projects:res.data})
    })

  }

  componentDidMount(){
    this.rounteGetProjects();
    
  }
  render(){
    return (
      <div className="main">
        <h3>All projects</h3>
        {
          this.state.projects.map((project) => {

            var projectProps = {
              ...project,
              key: project.id,
              refreshData:this.rounteGetProjects
    
            };
            return (<Project {...projectProps} />)
          })
        }
      </div>
    );
  }
}

export default RouteProjects;
