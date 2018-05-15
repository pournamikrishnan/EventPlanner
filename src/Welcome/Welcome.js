import React, { Component } from 'react';
import './Welcome.css';
import user_logo from '../media/user_logo.png';
import { Link } from 'react-router-dom';
import USAMap from "../usa/index"
import Events from '../Events/Events';
import WhereWhen from '../WhereWhen/WhereWhen';
import { modelInstance } from '../data/EventModel';
import Typed from 'react-typed';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      stateName: '',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    modelInstance.setStateCode(event.target.dataset.name);
    }



  render() {
    return (
      <div className="Welcome">
        <h1 className="display-2 text-white">
          <Typed
            strings={['Plan your day...!']}
            typeSpeed={40}
            backSpeed={50}

            showCursor={false}
          />
        </h1>

        <Link to="/wherewhen">
        <div className="App">
            <USAMap height={400} width='auto' onClick={this.handleClick}/>
        </div>
        </Link>
      </div>
    );
  }
}

export default Welcome;
