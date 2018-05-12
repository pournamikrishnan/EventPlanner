import React, {Component} from 'react';
import './Printout.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';


class Printout extends Component {

  componentDidMount() {
    modelInstance.addObserver(this)
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  render() {

    return (
      <div className = "Printout">
      <div className="container">
      <div className='header'>
        <h2 className="mb-4">Events planned</h2>
      </div>

      <Link to="/overview">
        <button id='goBackPrintout' type="button" className=" btn btn-success">Go back and edit details</button>
      </Link>

      <div id="dishdiv">
        <div className='table-responsive'>
          <table className='table'>
          <tbody className="tbody" >


          </tbody>
          </table>
        </div>
      </div>

      </div>
      </div>

    )
  }
}

export default Printout;
