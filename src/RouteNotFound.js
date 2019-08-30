import React, {Component} from 'react';
import {navigate} from '@reach/router'
import {authenticate} from './API';

class  RouteNotFound extends Component {



  	render(){


    	return (
				<div className ='main'>
					<h3>
						Please login!
					</h3>

				</div>

	  
    	);
  	}
}


export default RouteNotFound;
