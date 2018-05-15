import React, { Component } from 'react';
import './SelectEvent.css';
import Sidebar from '../Sidebar/Sidebar';
import Events from '../Events/Events';
import { modelInstance } from '../data/EventModel';
import { Link } from 'react-router-dom';
import moment, { calendarFormat } from 'moment';
import date from 'react-calendar';

let i;
let j;

class SelectEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: modelInstance.getStateCode(),
      date: this.props.state,
    }
  }

  componentDidMount = () => {
    modelInstance.addObserver(this)
  }

  searchstate = (event) => {
    this.setState({ state: event.target.value });
  }

  searchType = (event) => {
    this.setState({ type: event.target.value });
  }

  searchFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleAdd = (e) => {
    for (i in modelInstance.currentEventList) {
      if (e.target.id == modelInstance.currentEventList[i].id || e.target.parentNode.id == modelInstance.currentEventList[i].id) {
        if (e.target.value) {
          modelInstance.addEvent(modelInstance.currentEventList[i], e.target.value)
          return;
        } else if (e.target.parentNode.value) {
          modelInstance.addEvent(modelInstance.currentEventList[i], e.target.parentNode.value)
        }
      }
    }
  }

  update() {
    this.setState({
      date: date
    })
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  render() {

    return (
      <div className="SelectEvent" >
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6 center left'>
              <h4 className="mb-4 text-white"> Click on any timeslot to add to your own day of events</h4>
              <div id="accordion" className="accordion" role="tablist" aria-multiselectable="true">

                <div className="card">
                  <div className="card-header bg-grey text-white text-center" role="tab" id="headingOne">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" className="text-white" aria-controls="collapseOne">
                      Morning Events
                    </a>
                  </div>
                  <div id="collapseOne" className="collapse show " role="tabpanel" aria-labelledby="headingOne">
                    {(modelInstance.morningEventList && modelInstance.morningEventList.length != 0) ? (
                      modelInstance.morningEventList.map(event =>
                        <div key={event.id} className="card-block">
                          <div className="container-fluid py-2">
                            <div className="row">
                          <div className='col-sm-3 m-auto'>
                                <div className="font1">
                                  <i className="fa fa-clock-o"> {event.dates.start.localTime} </i>  </div>
                          </div>
                          <div className='col-sm-7'>
                            <b>{event.name}</b>
                            {event.place ? (
                              <div className="text-muted"><i className="fa fa-map-marker"></i> {event.place.address.line1}</div>
                            ) : (
                                <div className="text-muted"><i className="fa fa-map-marker"></i> {event._embedded.venues[0].address.line1}</div>
                              )
                            }
                            { event.priceRanges ? (
                              <div>Price range: {event.priceRanges[0].min}-{event.priceRanges[0].max} {event.priceRanges[0].currency} </div>
                            ) : (<i> Cost is not available at the moment</i>)
                            }
                          </div>
                            <div className="OneEvent col-sm-2 m-auto" id={event.id} >
                              <button id={event.id} value='1' className='removeEvent btn btn-success ' onClick={this.handleAdd}>
                                Add
                              </button>
                            </div>
                        </div>
                        </div>
                        </div>
                      )
                    ) : (
                        <ul className="list-group">
                          <li className="list-group-item"><b> No events were found at this time </b></li>
                        </ul>
                      )}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header bg-grey text-white text-center" role="tab" id="headingTwo">
                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" className="text-white" aria-expanded="false" aria-controls="collapseTwo">
                      Afternoon Events
                                </a>
                  </div>
                  <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
                    {(modelInstance.afternoonEventList && modelInstance.afternoonEventList.length != 0) ? (
                      modelInstance.afternoonEventList.map(event =>
                        <div key={event.id} className="card-block ">
                          <div className="container-fluid py-2">
                            <div className="row">
                              <div className='col-sm-3 m-auto' >
                                <div className="font1">
                                  <i className="fa fa-clock-o"> {event.dates.start.localTime} </i>
                                </div>
                              </div>
                              <div className='col-sm-7'>
                                <b>{event.name}</b>
                                {event.place ? (
                                  <div className="text-muted"><i className="fa fa-map-marker"></i> {event.place.address.line1}</div>
                                ) : (
                                    <div className="text-muted"><i className="fa fa-map-marker"></i> {event._embedded.venues[0].address.line1}</div>
                                  )
                                }
                                { event.priceRanges ? (
                                  <div>Price range: {event.priceRanges[0].min}-{event.priceRanges[0].max} {event.priceRanges[0].currency}</div>
                                ) : (<i> Cost is not available at the moment</i>)}                              </div>
                              <div className="OneEvent col-sm-2 m-auto" id={event.id}>
                                <button id={event.id} value='2' className='removeEvent btn btn-success' onClick={this.handleAdd}>
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                      )
                    ) : (
                        <ul className="list-group">
                          <li className="list-group-item"><b> No events were found at this time </b></li>
                        </ul>
                      )}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header bg-grey text-white text-center" role="tab" id="headingThree">
                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" className="text-white" aria-expanded="false" aria-controls="collapseThree">
                      Evening Events
                    </a>
                  </div>
                  <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
                    {(modelInstance.eveningEventList && modelInstance.eveningEventList.length != 0) ? (
                      modelInstance.eveningEventList.map(event =>
                        <div key={event.id} className="card-block">
                          <div className="container-fluid py-2">
                            <div className="row">
                              <div className='col-sm-3 m-auto'>
                                <div className="font1">
                                  <i className="fa fa-clock-o"> {event.dates.start.localTime} </i>
                                </div>
                              </div>
                              <div className='col-sm-7'>
                                <b>{event.name}</b>
                                {event.place ? (
                                  <div className="text-muted"><i className="fa fa-map-marker"></i>event.place.address.line1</div>
                                ) : (
                                    <div className="text-muted"><i className="fa fa-map-marker"></i>{event._embedded.venues[0].address.line1}</div>
                                  )
                                }
                                { event.priceRanges ? (
                                  <div>Price range: {event.priceRanges[0].min}-{event.priceRanges[0].max} {event.priceRanges[0].currency}</div>
                                ) : (<i> Cost is not available at the moment</i>)}
                              </div>
                              <div className="OneEvent col-sm-2 m-auto" id={event.id}>
                                <button id={event.id} value='3' className='removeEvent btn btn-success' onClick={this.handleAdd}>
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                        <ul className="list-group">
                          <li className="list-group-item"><b> No events were found at this time </b></li>
                        </ul>
                      )}
                  </div>
                </div>

              </div>
            </div>
            <div className='col-sm-6'>
              <Sidebar model={this.props.model} />
            </div>
          </div>

          <div className='btnDiv'>
            <Link to="/wherewhen">
              <button className="backHome btn btn-success mt-5 btn-l"><i className="fa fa-angle-left"></i> Back</button>
            </Link>
            <Link to="/overview">
              <button id='confirm' className="btn btn-success  mt-5">Confirm and See Details <i className="fa fa-angle-right"></i></button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}


export default SelectEvent;
