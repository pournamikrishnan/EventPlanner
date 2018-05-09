import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import { modelInstance } from '../data/EventModel';
import Sidebar from '../Sidebar/Sidebar';
import WhereWhen from '../WhereWhen/WhereWhen';


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      eventDetails: []
    };
  }

  loadData(props) {
    modelInstance.getEventDetails(modelInstance.getId()).then(eventDetail =>
      this.setState({
        status: 'LOADED',
        eventDetails: eventDetail
      })).catch(error =>
        this.setState({
          status: 'ERROR'
        }))

  }

  componentDidMount = (props) => {
    modelInstance.addObserver(this);
    this.loadData(props)
  }

  componentWillUnmount = () => {
    modelInstance.removeObserver(this)
  }

  update() {
    this.setState({
      eventDetails: this.state.eventDetails
    })
  }


  render() {
    switch (this.state.status) {
      case 'INITIAL':

        return (
          <div className='Details'>
            <center>
              <div className="loader"> </div>
            </center>
          </div>
        )
        break;

      case 'LOADED':
        const { eventDetails } = this.state


        localStorage.setItem('ED', JSON.stringify(this.state));
        let eventDetails2 = JSON.parse(localStorage.getItem("ED")).eventDetails;
        return (
          <div>
            <div className="Details">
              <div className="container">
                <div className="row">
                  <div className='col'>
                    <div className="card" >
                      <h3 className="card-header  bg-grey">
                        {eventDetails2._embedded.events[0].name}
                      </h3>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6">
                            <img alt='eventImg' className="img-fluid" id='eventImg' src={eventDetails2._embedded.events[0].images[0].url}></img></div>
                          <div className="col-lg-6">
                            <ul className="list-group">
                              <li className="list-group-item"><b><i className="fa fa-home"></i> Venue: </b>{eventDetails2._embedded.events[0]._embedded.venues[0].name}<br /></li>
                              <li className="list-group-item"><b><i className="fa fa-home"></i> City: </b>{eventDetails2._embedded.events[0]._embedded.venues[0].city.name}<br /></li>
                              <li className="list-group-item"><b><i className="fa fa-home"></i> State: </b>{eventDetails2._embedded.events[0]._embedded.venues[0].state.name}<br /></li>
                              <li className="list-group-item"><b><i className="fa fa-clock-o"></i> Time: </b>{eventDetails2._embedded.events[0].dates.start.localTime}<br /></li>
                              <li className="list-group-item"><b><i className="fa fa-calendar"></i> Date: </b>{eventDetails2._embedded.events[0].dates.start.localDate}<br /></li>
                              <li className="list-group-item"><a href={eventDetails2._embedded.events[0].url} target='_blank' className="text-success"><b><i className="fa fa-globe"></i> Visit website</b></a><br /></li>
                            </ul>
                            </div>
                        </div>

                      </div>
                    </div>


                    <Link to="/wherewhen">
                      <center>
                        <button className="backHome btn btn-success mt-5 btn-l"><i className="fa fa-angle-left"></i> Back to Search</button>
                      </center>
                    </Link>
                  </div>



                </div>
              </div>
            </div>
          </div>
        )

        break;
      default:
        return (
          <div className='Details'>
            <div id='details' className='col-sm-8'>
              <div className='failed'> <b>Failed to load data, please try again</b> </div>
            </div>
          </div>
        )
        break;
    }


    return (

      <nav className="classnavbar navbar-light">
        <div className="Details">
        </div>
      </nav>
    )
  }
}

export default Details;
